const express = require("express");
const router = express.Router();
const pool = require("../config/db");


router.post("/", async (req, res) => {
  const { name, insert_by } = req.body;
  try {
    await pool.query("CALL insert_designation($1, $2)", [name, insert_by]);
    res.json({ message: "Designation inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, update_by } = req.body;
  try {
    await pool.query("CALL update_designation($1, $2, $3)", [
      id,
      name,
      update_by,
    ]);
    res.json({ message: "Designation updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("CALL delete_designation($1)", [id]);
    res.json({ message: "Designation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/deactivate/:id", async (req, res) => {
  const { id } = req.params;
  const { update_by } = req.body;
  try {
    await pool.query("CALL deactivate_designation($1, $2)", [id, update_by]);
    res.json({ message: "Designation deactivated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/crud', async (req, res) => {
    try {
        const params = req.body; 
        const result = await pool.query('CALL proc_designations_crud($1, $2)', [params, null]);
        res.json({ success: true, msg: 'Procedure called', data: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Procedure failed', error: err.message });
    }
});


router.post('/archive', async (req, res) => {
    try {
        const { years } = req.body;
        await pool.query('CALL proc_designations_archive($1)', [years]);
        res.json({ success: true, msg: `Archiving done for records older than ${years} years` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Archiving failed', error: err.message });
    }
});


module.exports = router;
