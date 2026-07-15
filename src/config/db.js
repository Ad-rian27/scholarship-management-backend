const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is missing. Please add it to your .env file.");
  }

  await mongoose.connect(mongoURI);
  console.log("MongoDB Scholarship Management connected");
};

module.exports = connectDB;
