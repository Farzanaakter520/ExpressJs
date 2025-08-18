const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let patients = [];
let idCounter = 1;

app.post("/api/patients/register", (req, res) => {
  const { name, age, disease } = req.body;
  const patient = {
    id: idCounter++,
    name,
    age,
    disease,
    status: "REGISTERED"
  };
  patients.push(patient);
  res.status(201).json(patient);
});

app.put("/api/patients/:id/admit", (req, res) => {
  const patient = patients.find(p => p.id == req.params.id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });

  patient.status = "ADMITTED";
  res.json(patient);
});

app.put("/api/patients/:id/release", (req, res) => {
  const patient = patients.find(p => p.id == req.params.id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });

  patient.status = "RELEASED";
  res.json(patient);
});

app.get("/api/patients", (req, res) => {
  res.json(patients);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
