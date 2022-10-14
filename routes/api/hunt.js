const express = require("express");
const router = express.Router();
const huntCtrl = require("../../controllers/hunt");

router.post("/create", huntCtrl.create);
router.get("/getHunt", huntCtrl.getHunt);
router.delete("/deleteAll", huntCtrl.deleteHunt);

module.exports = router;
