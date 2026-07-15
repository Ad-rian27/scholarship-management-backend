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

const searchStudents = async (req, res) => {
  try {
    const { searchText } = req.body;

    if (!searchText || !searchText.trim()) {
      const students = await Student.find();
      return res.json(students);
    }

    const students = await Student.find({
      $or: [
        { stuID: { $regex: searchText, $options: "i" } },
        { stuName: { $regex: searchText, $options: "i" } },
        { regNo: { $regex: searchText, $options: "i" } },
        { email: { $regex: searchText, $options: "i" } },
      ],
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to search students", error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { stuID, regNo, _id } = req.body;

    const filter = _id ? { _id } : stuID ? { stuID } : regNo ? { regNo } : null;

    if (!filter) {
      return res.status(400).json({ message: "Please provide stuID, regNo, or _id to delete a student." });
    }

    const deletedStudent = await Student.findOneAndDelete(filter);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ status: "success", deletedStudent });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student", error: error.message });
  }
};

module.exports = {
  viewStudents,
  addStudent,
  searchStudents,
  deleteStudent,
};
