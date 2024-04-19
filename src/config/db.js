// const mongodbUrl =
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const mongodbUrl = process.env.DATABASE_URL;

async function cennectDB() {
  return mongoose.connect(mongodbUrl);
}
