const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const huntSchema = new Schema(
  {
    HuntName: { type: String, required: true },
    userId: { type: String },
    interested: [
      {
        type: Schema.Types.ObjectId,
        ref: "Interested",
      },
    ],
    offer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    interviewing: [
      {
        type: Schema.Types.ObjectId,
        ref: "Interviewing",
      },
    ],
    applied: [
      {
        type: Schema.Types.ObjectId,
        ref: "Applied",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hunt", huntSchema);
