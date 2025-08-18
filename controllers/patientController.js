let patients = [];
let idCounter = 1;

const registerPatient = (req, res) => {
  const { name, age, disease } = req.body;

  if (!name || !age || !disease) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const patient = {
    id: idCounter++,
    name,
    age,
    disease,
    status: "REGISTERED"
  };

  patients.push(patient);
  res.status(201).json(patient);
};

const admitPatient = (req, res) => {
  const patient = patients.find(p => p.id == req.params.id);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  patient.status = "ADMITTED";
  res.json(patient);
};

const releasePatient = (req, res) => {
  const patient = patients.find(p => p.id == req.params.id);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  patient.status = "RELEASED";
  res.json(patient);
};

const getAllPatients = (req, res) => {
  res.json(patients);
};

module.exports = {
  registerPatient,
  admitPatient,
  releasePatient,
  getAllPatients
};
