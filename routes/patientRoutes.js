const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// CRUD
router.post("/insert", patientController.insertPatient);
router.put("/update/:id", patientController.updateStatus);
router.delete("/delete/:id", patientController.deletePatient);

// Release letter + email
router.post("/release-letter/email", patientController.releaseLetterAndEmail);

// Fetch
router.get("/all", patientController.getAllPatients);
router.get("/released", patientController.getReleasedPatients);

// Generate + Download Release Letter
router.post("/release-letter", patientController.releaseLetterById);

module.exports = router;
