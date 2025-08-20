const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


router.post('/', async (req, res) => {
  try {
    const params = req.body;
    const result = await pool.query(
      `SELECT * FROM proc_doctor_crud($1::json)`,
      [JSON.stringify(params)]
    );
    res.json(result.rows[0].result);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
