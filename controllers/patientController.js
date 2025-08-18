const { Pool } = require("pg");

const pool = new Pool({
 user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "isdb62",
  port: 5432,
});

exports.insertPatient = async (req, res) => {
  const { name, age, disease } = req.body;

  try {
    await pool.query('CALL insert_patient_proc($1, $2, $3)', [name, age, disease]);
    res.status(201).json({ message: 'Patient inserted successfully' });
  } catch (error) {
    console.error('Insert Error:', error);
    res.status(500).json({ error: 'Failed to insert patient' });
  }
};

exports.updateStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  try {
    await pool.query('CALL update_patient_status_proc($1, $2)', [id, status]);
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.deletePatient = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await pool.query('CALL delete_patient_proc($1)', [id]);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

exports.getAllPatients = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('CALL get_all_patients_proc($1)', ['cur']);
    const result = await client.query('FETCH ALL FROM cur');
    await client.query('COMMIT');
    res.status(200).json(result.rows);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  } finally {
    client.release();
  }
};


exports.getReleasedPatients = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('CALL get_released_patients_proc($1)', ['cur_released']);
    const result = await client.query('FETCH ALL FROM cur_released');
    await client.query('COMMIT');
    res.status(200).json(result.rows);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error fetching discharged patients:", err);
    res.status(500).json({ error: 'Failed to fetch discharged patients' });
  } finally {
    client.release();
  }
};


