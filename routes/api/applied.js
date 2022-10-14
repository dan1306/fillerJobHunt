const express = require("express");
const router = express.Router();
const appliedtCtrl = require("../../controllers/applied");

router.post("/create", appliedtCtrl.create);

router.get("/getAppliedJobs/:id", appliedtCtrl.getAppliedJobs);

router.delete("/deleteApplication", appliedtCtrl.deleteApplication);

router.put("/edit", appliedtCtrl.editApplication);

module.exports = router;
