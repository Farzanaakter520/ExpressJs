const pool = require("../config/db");


const hospitalHandler = async (req, res) => {
  const params = req.body;

  try {
    const result = await pool.query(
      `CALL proc_hospital_crud($1);`,
      [JSON.stringify(params)]
    );

    res.json({
      status: 'success',
      message: 'Procedure executed successfully',
    });

  } catch (err) {
    console.error('Error calling procedure:', err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  hospitalHandler,
};
