require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Scholarship Management connected");
  })
  .catch((err) => {
    console.log(err);
  });

const Student = mongoose.model("Students", new mongoose.Schema({
  stuID: String,
  stuName: String,
  regNo: String,
  dept: String,
  course: String,
  yos: String,
  email: String,
  phone: String,
}));

const Scholarship = mongoose.model("Scholarships", new mongoose.Schema({
  scholID: String,
  scholName: String,
  scholType: String,
  eligpa: String,
  maxfaminc: String,
  scholAmt: String,
  lastDate: String,
  desc: String,
}));

const Application = mongoose.model("Applications", new mongoose.Schema({
  appID: String,
  stuID: String,
  scholID: String,
  appDate: String,
  cgpa: String,
  faminc: String,
  status: String,
  refNo: String,
}));

app.post("/view-schol", async (req, res) => {
  const scholarships = await Scholarship.find();
  res.json(scholarships);
});

app.post("/add-schol", async (req, res) => {
  await Scholarship.create(req.body);
  res.json({ status: "success" });
});

app.post("/search-schol", async (req, res) => {
  try {
    const { searchText } = req.body;

    if (!searchText || !searchText.trim()) {
      const scholarships = await Scholarship.find();
      return res.json(scholarships);
    }

    const scholarships = await Scholarship.find({
      $or: [
        { scholID: { $regex: searchText, $options: "i" } },
        { scholName: { $regex: searchText, $options: "i" } },
        { scholType: { $regex: searchText, $options: "i" } },
        { eligpa: { $regex: searchText, $options: "i" } },
        { desc: { $regex: searchText, $options: "i" } },
      ],
    });

    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Failed to search scholarships", error: error.message });
  }
});

app.post("/delete-schol", async (req, res) => {
  try {
    const { scholID, _id } = req.body;
    const filter = _id ? { _id } : scholID ? { scholID } : null;

    if (!filter) {
      return res.status(400).json({ message: "Please provide scholID or _id to delete a scholarship." });
    }

    const deletedScholarship = await Scholarship.findOneAndDelete(filter);

    if (!deletedScholarship) {
      return res.status(404).json({ message: "Scholarship not found." });
    }

    res.json({ status: "success", deletedScholarship });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete scholarship", error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});