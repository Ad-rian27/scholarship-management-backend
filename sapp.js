require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const {
  viewStudents,
  addStudent,
  searchStudents,
  deleteStudent,
} = require("./src/controllers/studentController");
const {
  viewScholarships,
  addScholarship,
} = require("./src/controllers/scholarshipController");
const {
  viewApplications,
  addApplication,
} = require("./src/controllers/applicationController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/view-app", viewApplications);
app.post("/add-app", addApplication);
app.post("/view-schol", viewScholarships);
app.post("/add-schol", addScholarship);
app.post("/view-std", viewStudents);
app.post("/add-std", addStudent);
app.post("/search-std", searchStudents);
app.post("/delete-std", deleteStudent);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});