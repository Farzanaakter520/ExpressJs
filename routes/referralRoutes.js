const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // pg pool connection

router.post("/", async (req, res) => {
  const params = req.body;

  try {
    const query = `SELECT fn_referral_master_crud($1::JSON) AS result`;
    const { rows } = await pool.query(query, [params]);
    
    res.json(rows[0].result); // direct success/fail JSON from procedure
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message, data: null });
  }
});

module.exports = router;
