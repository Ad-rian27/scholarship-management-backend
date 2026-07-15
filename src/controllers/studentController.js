const Student = require("../models/studentModel");

const viewStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    await Student.create(req.body);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add student", error: error.message });
  }
};

module.exports = {
  viewStudents,
  addStudent,
};
