const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    Company: { type: String, required: true },
    JobTitle: { type: String, required: true },
    PayPerYear: { type: Number, required: true },
    starDate: { type: String, required: true },
    offerExpires: { type: String, required: true },
    userId: { type: String },
    Accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", offerSchema);
