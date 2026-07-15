const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    appID: String,
    stuID: String,
    scholID: String,
    appDate: String,
    cgpa: String,
    faminc: String,
    status: String,
    refNo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applications", applicationSchema, "Applications");
