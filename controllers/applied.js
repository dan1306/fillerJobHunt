const Hunt = require("../models/hunt");
const Applied = require("../models/applied");

module.exports = {
  create,
  getAppliedJobs,
  deleteApplication,
  editApplication,
};

async function create(req, res) {
  console.log(req.body);
  try {
    let newApplication = new Applied();
    newApplication.JobTitle = req.body.JobTitle;
    newApplication.DateApplied = req.body.DateApplied;
    newApplication.JobDescription = req.body.JobDescription;
    newApplication.userId = req.body.userId;
    newApplication.CompanyName = req.body.CompanyName;
    newApplication = await newApplication.save();

    let hunt = await Hunt.findById(req.body.id);
    hunt.applied.push(newApplication._id);
    hunt = await hunt.save();

    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAppliedJobs(req, res) {
  console.log(req.params);

  let id = req.params.id;

  let hunt = await Hunt.findById(id);
  hunt = await hunt.populate("applied");

  res.json(hunt.applied);
}

async function deleteApplication(req, res) {
  try {
    let hunt = await Hunt.findById(req.body.huntId);

    for (let i = 0; i < hunt.applied.length; i++) {
      if (hunt.applied[i]._id.toString() === req.body.id) {
        hunt.applied.splice(i, 1);
      }
    }

    await hunt.save();

    await Applied.findByIdAndDelete(req.body.id);
    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editApplication(req, res) {
  try {
    let edit = await Applied.findById(req.body.id);
    edit.JobDescription = req.body.JobDescription;
    edit = await edit.save();
    console.log(edit);
    res.status(200).json("all good");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
