const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to Database');
    release();
});

// Routes
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('PathMakers API Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
