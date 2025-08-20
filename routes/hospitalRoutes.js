const express = require('express');
const router = express.Router();
const { hospitalHandler } = require('../controllers/hospitalController');

router.post('/', hospitalHandler);

module.exports = router;
