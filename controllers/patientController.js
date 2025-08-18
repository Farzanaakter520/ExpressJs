const pool = require("../db");

const registerPatient = async (req, res) => {
  const { name, age, disease } = req.body;
  if (!name || !age || !disease) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO patients (name, age, disease) VALUES ($1, $2, $3) RETURNING *",
      [name, age, disease]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const admitPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE patients SET status='ADMITTED' WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Patient not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const releasePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE patients SET status='RELEASED' WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Patient not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerPatient,
  admitPatient,
  releasePatient,
  getAllPatients
};









// let patients = [];
// let idCounter = 1;

// const registerPatient = (req, res) => {
//   const { name, age, disease } = req.body;

//   if (!name || !age || !disease) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const patient = {
//     id: idCounter++,
//     name,
//     age,
//     disease,
//     status: "REGISTERED"
//   };

//   patients.push(patient);
//   res.status(201).json(patient);
// };

// const admitPatient = (req, res) => {
//   const patient = patients.find(p => p.id == req.params.id);

//   if (!patient) {
//     return res.status(404).json({ error: "Patient not found" });
//   }

//   patient.status = "ADMITTED";
//   res.json(patient);
// };

// const releasePatient = (req, res) => {
//   const patient = patients.find(p => p.id == req.params.id);

//   if (!patient) {
//     return res.status(404).json({ error: "Patient not found" });
//   }

//   patient.status = "RELEASED";
//   res.json(patient);
// };

// const getAllPatients = (req, res) => {
//   res.json(patients);
// };

// module.exports = {
//   registerPatient,
//   admitPatient,
//   releasePatient,
//   getAllPatients
// };


