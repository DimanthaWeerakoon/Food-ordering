// const mongodbUrl =
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const mongodbUrl = process.env.DATABASE_URL;

async function connectDB() {
  return mongoose.connect(mongodbUrl);
}

module.exports = connectDB;
