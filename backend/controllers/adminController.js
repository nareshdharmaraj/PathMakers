const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

exports.getStats = async (req, res) => {
    try {
        const totalRequests = await pool.query("SELECT COUNT(*) FROM requests");
        const activeProjects = await pool.query("SELECT COUNT(*) FROM requests WHERE status != 'Completed' AND status != 'Pending'");
        const activeEmployees = await pool.query("SELECT COUNT(*) FROM employees WHERE role = 'employee' AND is_active = true");

        // Financials
        const clientFinancials = await pool.query(`
            SELECT 
                SUM(price_fixed) as total_fixed,
                SUM(amount_received) as total_received
            FROM requests
        `);

        const employeeFinancials = await pool.query(`
            SELECT 
                SUM(payment_amount) FILTER (WHERE payment_status = 'Paid') as total_paid,
                SUM(payment_amount) FILTER (WHERE payment_status != 'Paid') as total_pending
            FROM request_assignments
        `);

        res.json({
            totalRequests: totalRequests.rows[0].count,
            activeProjects: activeProjects.rows[0].count,
            activeEmployees: activeEmployees.rows[0].count,
            financials: {
                client: {
                    fixed: parseFloat(clientFinancials.rows[0].total_fixed || 0),
                    received: parseFloat(clientFinancials.rows[0].total_received || 0)
                },
                employee: {
                    paid: parseFloat(employeeFinancials.rows[0].total_paid || 0),
                    pending: parseFloat(employeeFinancials.rows[0].total_pending || 0)
                }
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateRequestFinancials = async (req, res) => {
    const { requestId, priceFixed, amountReceived } = req.body;
    try {
        await pool.query(
            'UPDATE requests SET price_fixed = $1, amount_received = $2 WHERE id = $3',
            [priceFixed, amountReceived, requestId]
        );
        res.json({ msg: 'Financials updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getClients = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.id, c.name, c.email, c.phone,
                json_agg(
                    json_build_object(
                        'id', r.id, 
                        'unique_id', r.unique_id, 
                        'status', r.status,
                        'price_fixed', r.price_fixed,
                        'amount_received', r.amount_received
                    )
                ) as projects,
                COUNT(r.id) as project_count,
                SUM(r.amount_received) as total_paid,
                SUM(r.price_fixed - r.amount_received) as total_due
            FROM clients c
            LEFT JOIN requests r ON c.id = r.client_id
            GROUP BY c.id
            ORDER BY c.name
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getRequests = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                r.*, 
                c.name as client_name, 
                c.email as client_email, 
                c.phone as client_phone,
                c.address_city,
                s.name as service_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', e.id,
                            'name', e.name,
                            'assigned_at', ra.assigned_at
                        )
                    ) FILTER (WHERE e.id IS NOT NULL), 
                    '[]'
                ) as assigned_employees
            FROM requests r
            LEFT JOIN clients c ON r.client_id = c.id
            LEFT JOIN services s ON r.service_id = s.id
            LEFT JOIN request_assignments ra ON r.id = ra.request_id
            LEFT JOIN employees e ON ra.employee_id = e.id
            GROUP BY r.id, c.id, s.id
            ORDER BY r.submission_date DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.role, 
                u.is_active, 
                u.last_login_at,
                COUNT(CASE WHEN r.status = 'Ongoing' THEN 1 END) as ongoing_count,
                COUNT(CASE WHEN r.status = 'Completed' THEN 1 END) as completed_count
            FROM employees u
            LEFT JOIN request_assignments ra ON u.id = ra.employee_id
            LEFT JOIN requests r ON ra.request_id = r.id
            WHERE u.role IN ('employee', 'admin')
            GROUP BY u.id
            ORDER BY u.name
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Assign Request (Multi-Employee + Metadata)
exports.assignEmployee = async (req, res) => {
    const {
        requestId,
        employeeIds, // Array of UUIDs
        quotedPrice,
        adminCommands,
        techStack, // { frontend, backend, db }
        shareDocs,
        expectedDate,
        status
    } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Update Request Metadata
        await client.query(`
            UPDATE requests 
            SET status = $1, 
                quoted_price = $2, 
                admin_commands = $3, 
                tech_stack_frontend = $4, 
                tech_stack_backend = $5, 
                tech_stack_db = $6, 
                share_docs_with_employee = $7, 
                admin_expected_date = $8
            WHERE id = $9
        `, [
            status || 'Confirmed',
            quotedPrice,
            adminCommands,
            techStack?.frontend,
            techStack?.backend,
            techStack?.db,
            shareDocs,
            expectedDate,
            requestId
        ]);

        // 2. Insert Assignments (Ignore duplicates)
        if (employeeIds && employeeIds.length > 0) {
            for (const empId of employeeIds) {
                await client.query(`
                    INSERT INTO request_assignments (request_id, employee_id)
                    VALUES ($1, $2)
                    ON CONFLICT (request_id, employee_id) DO NOTHING
                `, [requestId, empId]);
            }
        }

        await client.query('COMMIT');
        res.json({ msg: 'Assignments updated successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
};

// Update Password
exports.updatePassword = async (req, res) => {
    const { userId, newPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await pool.query('UPDATE employees SET password_hash = $1 WHERE id = $2', [hash, userId]);
        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// New Function: Add Employee
exports.addEmployee = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO employees (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
            [name, email, password_hash, role]
        );

        res.json({ msg: 'Employee added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.reviewSubmission = async (req, res) => {
    const { requestId, decision, message } = req.body; // decision: 'Accepted' or 'Rejected'
    try {
        if (decision === 'Accepted') {
            await pool.query("UPDATE requests SET status = 'Accepted' WHERE id = $1", [requestId]);
        } else if (decision === 'Rejected') {
            await pool.query(
                "UPDATE requests SET status = 'Changes Requested', admin_review_message = $1 WHERE id = $2",
                [message, requestId]
            );
        }
        res.json({ msg: 'Review submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getContactMessages = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
