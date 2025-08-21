const express = require("express");
const router = express.Router();
const pool = require("../config/db");
  

// Insert
router.post("/", async (req, res) => {
  const { name, insert_by } = req.body;
  try {
    await pool.query("CALL insert_specialty($1, $2)", [name, insert_by]);
    res.json({ message: "Specialty inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, update_by } = req.body;
  try {
    await pool.query("CALL update_specialty($1, $2, $3)", [
      id,
      name,
      update_by,
    ]);
    res.json({ message: "Specialty updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("CALL delete_specialty($1)", [id]);
    res.json({ message: "Specialty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deactivate
router.patch("/deactivate/:id", async (req, res) => {
  const { id } = req.params;
  const { update_by } = req.body;
  try {
    await pool.query("CALL deactivate_specialty($1, $2)", [id, update_by]);
    res.json({ message: "Specialty deactivated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
