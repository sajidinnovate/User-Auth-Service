const express = require('express');
const pool = require('./db_config');
const app = express();

app.use(express.json());

// registration route
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    
    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ error: "name and email are required" });
    }
    
    try {
        const queryText = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
        const result = await pool.query(queryText, [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: "failed to save user", details: err.message });
    }
});

module.exports = app;