const express = require("express");
const router = express.Router();
const pool = require("../config/db"); 

// POST: call fn_drug_master_crud
router.post("/", async (req, res) => {
  try {
    const params = req.body; // json from postman
    const query = "SELECT fn_drug_master_crud($1) AS result";
    const { rows } = await pool.query(query, [params]);

    res.json(rows[0].result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
