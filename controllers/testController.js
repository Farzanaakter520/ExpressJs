const pool = require("../config/db");

exports.insertTests = async (req, res) => {
  const { patient_id, tests } = req.body; 

  if (!tests || tests.length !== 5) {
    return res.status(400).json({ error: "Exactly 5 tests are required" });
  }

  try {
    await pool.query("CALL insert_patient_tests($1, $2, $3, $4, $5, $6)", [
      patient_id,
      tests[0],
      tests[1],
      tests[2],
      tests[3],
      tests[4],
    ]);
    res.status(201).json({ message: "Tests inserted successfully" });
  } catch (error) {
    console.error("Insert Tests Error:", error);
    res.status(500).json({ error: "Failed to insert tests" });
  }
};

exports.getTests = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM get_patient_tests($1)", [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Fetch Tests Error:", error);
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};
