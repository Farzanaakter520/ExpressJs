const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// router.get("/api/reports", reportController.getPatientReport);
router.get("/patients/report", reportController.getPatientReport);


module.exports = router;
