const Hunt = require("../models/hunt");
const Interviewing = require("../models/interviewing");

module.exports = {
  create,
  getInterviews,
  editInterview,
  deleteInterview,
};

async function create(req, res) {
  console.log(req.body);
  try {
    let newInterview = new Interviewing();
    newInterview.Company = req.body.Company;
    newInterview.JobTitle = req.body.JobTitle;
    newInterview.RoundOfInterview = req.body.RoundOfInterview;
    newInterview.InterviewDate = req.body.InterviewDate;
    newInterview.userId = req.body.userId;
    newInterview = await newInterview.save();

    let hunt = await Hunt.findById(req.body.id);
    hunt.interviewing.push(newInterview._id);
    hunt = await hunt.save();

    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getInterviews(req, res) {
  let id = req.params.id;
  let hunt = await Hunt.findById(id);
  hunt = await hunt.populate("interviewing");

  console.log(hunt.interviewing);

  res.json(hunt.interviewing);
}

async function editInterview(req, res) {
  try {
    let edit = await Interviewing.findById(req.body.id);
    edit.InterviewDate = req.body.InterviewDate;
    edit.RoundOfInterview = req.body.RoundOfInterview;
    edit = await edit.save();
    console.log(edit);
    res.status(200).json("all good");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function deleteInterview(req, res) {
  try {
    let hunt = await Hunt.findById(req.body.huntId);

    for (let i = 0; i < hunt.interviewing.length; i++) {
      if (hunt.interviewing[i]._id.toString() === req.body.id) {
        hunt.interviewing.splice(i, 1);
      }
    }

    await hunt.save();

    await Interviewing.findByIdAndDelete(req.body.id);
    res.status(200).json("all good");
  } catch (err) {
    res.status(400).json(err);
  }
}
