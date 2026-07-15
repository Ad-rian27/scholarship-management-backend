const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    stuID: String,
    stuName: String,
    regNo: String,
    dept: String,
    course: String,
    yos: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema, "Students");
