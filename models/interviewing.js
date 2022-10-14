const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewingSchema = new Schema(
  {
    Company: { type: String, required: true },
    JobTitle: { type: String, required: true },
    RoundOfInterview: { type: String, required: true },
    InterviewDate: { type: String, required: true },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interviewing", interviewingSchema);
