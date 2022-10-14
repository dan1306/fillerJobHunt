const express = require("express");
const router = express.Router();
const offertCtrl = require("../../controllers/offer");

router.post("/create", offertCtrl.create);

router.get("/getOffers/:id", offertCtrl.getOffers);

router.put("/edit", offertCtrl.editOffer);

router.delete("/delete", offertCtrl.deleteOffer);

router.put("/acceptOffer", offertCtrl.acceptedOffer);

router.put("/declineOffer", offertCtrl.declineOffer);

module.exports = router;
