const express = require("express");
const router = express.Router();
const interestCtrl = require("../../controllers/interested");

router.post("/create", interestCtrl.create);

router.get("/getInterests/:id", interestCtrl.getInterest);

router.delete("/deleteInterest", interestCtrl.deleteInterest);

router.put("/editJobDesc", interestCtrl.editJobDesc);

module.exports = router;
