const Scholarship = require("../models/scholarshipModel");

const viewScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scholarships", error: error.message });
  }
};

const addScholarship = async (req, res) => {
  try {
    await Scholarship.create(req.body);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add scholarship", error: error.message });
  }
};

module.exports = {
  viewScholarships,
  addScholarship,
};
