const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' }); // Adjust path if running from root or backend

// Fix for env var loading if running from root vs backend
const pathToEnv = require('path').resolve(__dirname, '../.env');
require('dotenv').config({ path: pathToEnv });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkSystem() {
    console.log('--- System Diagnostic ---');
    console.log('1. Checking Environment Variables...');
    if (!process.env.JWT_SECRET) {
        console.error('❌ CRITICAL: JWT_SECRET is MISSING in environment variables!');
    } else {
        console.log('✅ JWT_SECRET is present.');
    }

    if (!process.env.DATABASE_URL) {
        console.error('❌ CRITICAL: DATABASE_URL is MISSING!');
        process.exit(1);
    }
    console.log('✅ DATABASE_URL is present.');

    console.log('\n2. Diagnostic: Listing All Users...');
    try {
        const res = await pool.query('SELECT id, name, email, role, password_hash, created_at FROM employees');

        if (res.rows.length === 0) {
            console.log('⚠️ No users found in "employees" table.');
        } else {
            console.log(`Found ${res.rows.length} user(s):`);
            res.rows.forEach(u => {
                console.log(` - [${u.role}] ${u.email} (Name: ${u.name})`);
                if (!u.password_hash) console.warn('   ⚠️ WARNING: No password hash set!');
            });
        }

        console.log('\n3. Verifying Login for "saravanapriyanst@gmail.com" ...');
        const email = 'saravanapriyanst@gmail.com';
        const passwordInput = 'saravanapriyanst';

        const userRes = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
        if (userRes.rows.length === 0) {
            console.error(`❌ User ${email} does NOT exist in DB.`);
        } else {
            const user = userRes.rows[0];
            const isMatch = await bcrypt.compare(passwordInput, user.password_hash);
            if (isMatch) {
                console.log(`✅ SUCCESS: Password '${passwordInput}' is CORRECT for ${email}.`);
                console.log('   If login fails on website, the issue is likely JWT_SECRET on the server.');
            } else {
                console.error(`❌ FAILED: Password '${passwordInput}' is WRONG for ${email}.`);
                console.log('   The user exists, but the password in DB does not match what you are responding.');

                // OFFER FIX
                console.log('   Attempting to FIX password now...');
                const salt = await bcrypt.genSalt(10);
                const newHash = await bcrypt.hash(passwordInput, salt);
                await pool.query('UPDATE employees SET password_hash = $1 WHERE email = $2', [newHash, email]);
                console.log(`   ✅ FIXED: Password for ${email} has been reset to '${passwordInput}'.`);
            }
        }

    } catch (err) {
        console.error('❌ Database Error:', err);
    } finally {
        pool.end();
    }
}

checkSystem();
