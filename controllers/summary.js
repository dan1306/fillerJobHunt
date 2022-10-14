const Hunt = require("../models/hunt");

module.exports = {
  getJobHunt,
};

async function getJobHunt(req, res) {
  console.log(req.params);

  let id = req.params.id;

  let hunt = await Hunt.findById(id);

  await hunt.populate("offer");

  res.json(hunt);
}
