const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    scholID: String,
    scholName: String,
    scholType: String,
    eligpa: String,
    maxfaminc: String,
    scholAmt: String,
    lastDate: String,
    desc: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scholarships", scholarshipSchema, "Scholarships");
