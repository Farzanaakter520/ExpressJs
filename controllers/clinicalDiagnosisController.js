const pool = require("../config/db");

const handleClinicalDiagnosis = async (req, res) => {
  const params = req.body;

  try {
    const result = await pool.query('CALL proc_clinical_diagnosis_crud($1::json, $2::json)', [
      JSON.stringify(params),
      null,
    ]);

    res.json({
      status: 'success',
      message: 'Procedure executed successfully',
    });
  } catch (error) {
    console.error('Error executing procedure:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { handleClinicalDiagnosis };
