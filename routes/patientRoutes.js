const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get('/all', patientController.getAllPatients);

router.get('/released', patientController.getReleasedPatients);

router.post("/insert", patientController.insertPatient);

router.put("/update/:id", patientController.updateStatus);

router.delete("/delete/:id", patientController.deletePatient);

module.exports = router;
