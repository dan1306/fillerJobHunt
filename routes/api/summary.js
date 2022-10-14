const express = require("express");
const router = express.Router();
const summaryCtrl = require("../../controllers/summary");

router.get("/:id", summaryCtrl.getJobHunt);

module.exports = router;
