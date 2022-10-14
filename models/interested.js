const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestedSchema = new Schema(
  {
    JobTitle: { type: String, required: true },
    JobDescription: { type: String, required: true },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interested", interestedSchema);
