const Application = require("../models/applicationModel");

const viewApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

const addApplication = async (req, res) => {
  try {
    await Application.create(req.body);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add application", error: error.message });
  }
};

module.exports = {
  viewApplications,
  addApplication,
};
