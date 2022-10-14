const Hunt = require("../models/hunt");
const Applied = require("../models/applied");
const Offer = require("../models/offer");
const Interviewing = require("../models/interviewing");
const Interested = require("../models/interested");

module.exports = {
  create,
  getHunt,
  deleteHunt,
};

async function create(req, res) {
  console.log(req.body);
  try {
    await Hunt.create({ HuntName: req.body.HuntName, userId: req.body.userId });

    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getHunt(req, res) {
  Hunt.find({ userId: req.user._id }, (err, hunts) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(hunts);
      res.json(hunts);
    }
  });
}

async function deleteHunt(req, res) {
  try {
    let hunt = await Hunt.findById(req.body.huntId);

    for (let i = 0; i < hunt.interested.length; i++) {
      await Interested.findByIdAndDelete(hunt.interested[i]._id.toString());
    }

    for (let i = 0; i < hunt.applied.length; i++) {
      await Applied.findByIdAndDelete(hunt.applied[i]._id.toString());
    }

    for (let i = 0; i < hunt.offer.length; i++) {
      await Offer.findByIdAndDelete(hunt.offer[i]._id.toString());
    }

    for (let i = 0; i < hunt.interviewing.length; i++) {
      await Interviewing.findByIdAndDelete(hunt.interviewing[i]._id.toString());
    }

    await Hunt.findByIdAndDelete(req.body.huntId);

    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}
