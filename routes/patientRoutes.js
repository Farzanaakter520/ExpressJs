const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/register", patientController.registerPatient);
router.put("/:id/admit", patientController.admitPatient);
router.put("/:id/release", patientController.releasePatient);
router.get("/", patientController.getAllPatients);

module.exports = router;
