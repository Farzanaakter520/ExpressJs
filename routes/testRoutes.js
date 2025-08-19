const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.post("/insert", testController.insertTests);
router.get("/:id", testController.getTests);

module.exports = router;
