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

const searchApplications = async (req, res) => {
  try {
    const { searchText } = req.body;

    if (!searchText || !searchText.trim()) {
      const applications = await Application.find();
      return res.json(applications);
    }

    const applications = await Application.find({
      $or: [
        { appID: { $regex: searchText, $options: "i" } },
        { stuID: { $regex: searchText, $options: "i" } },
        { scholID: { $regex: searchText, $options: "i" } },
        { status: { $regex: searchText, $options: "i" } },
        { refNo: { $regex: searchText, $options: "i" } },
      ],
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to search applications", error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { appID, stuID, scholID, _id } = req.body;
    const filter = _id ? { _id } : appID ? { appID } : stuID ? { stuID } : scholID ? { scholID } : null;

    if (!filter) {
      return res.status(400).json({ message: "Please provide appID, stuID, scholID, or _id to delete an application." });
    }

    const deletedApplication = await Application.findOneAndDelete(filter);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.json({ status: "success", deletedApplication });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error: error.message });
  }
};

module.exports = {
  viewApplications,
  addApplication,
  searchApplications,
  deleteApplication,
};
