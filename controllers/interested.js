const Interested = require("../models/interested");
const Hunt = require("../models/hunt");

module.exports = {
  create,
  getInterest,
  deleteInterest,
  editJobDesc,
};

async function create(req, res) {
  console.log(req.body);
  try {
    let newInterest = new Interested();
    newInterest.JobTitle = req.body.JobTitle;
    newInterest.JobDescription = req.body.JobDescription;
    newInterest.userId = req.body.userId;
    newInterest = await newInterest.save();

    let hunt = await Hunt.findById(req.body.id);
    hunt.interested.push(newInterest._id);
    hunt = await hunt.save();

    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getInterest(req, res) {
  console.log(req.params);

  let id = req.params.id;

  let hunt = await Hunt.findById(id);
  hunt = await hunt.populate("interested");

  res.json(hunt.interested);
}

async function deleteInterest(req, res) {
  console.log(req.body);

  try {
    let hunt = await Hunt.findById(req.body.huntId);

    for (let i = 0; i < hunt.interested.length; i++) {
      if (hunt.interested[i]._id.toString() === req.body.id) {
        hunt.interested.splice(i, 1);
      }
    }

    await hunt.save();

    await Interested.findByIdAndDelete(req.body.id);
    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editJobDesc(req, res) {
  console.log(req.body);

  try {
    let edit = await Interested.findById(req.body.id);
    edit.JobDescription = req.body.JobDescription;
    edit = await edit.save();
    console.log(edit);
    res.status(200).json("all good");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
