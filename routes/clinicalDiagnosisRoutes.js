const express = require('express');
const router = express.Router();
const { handleClinicalDiagnosis } = require('../controllers/clinicalDiagnosisController');

router.post('/', handleClinicalDiagnosis);

module.exports = router;
