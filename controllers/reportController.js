const pool = require("../config/db");

exports.getPatientReport = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query("CALL get_patient_report_proc('cur_report')");

    const result = await client.query("FETCH ALL FROM cur_report");

    await client.query("COMMIT");

    res.status(200).json(result.rows);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Report Error:", error);
    res.status(500).json({ error: "Failed to fetch patient report" });
  } finally {
    client.release();
  }
};
