const express = require("express");
const router = express.Router();
const pool = require("../config/db");


// Insert
router.post("/", async (req, res) => {
  const { name, insert_by } = req.body;
  try {
    await pool.query("CALL insert_designation($1, $2)", [name, insert_by]);
    res.json({ message: "Designation inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
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

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("CALL delete_designation($1)", [id]);
    res.json({ message: "Designation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deactivate
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

module.exports = router;
