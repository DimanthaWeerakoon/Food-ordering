const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRoutes");
const app = express();
const authRoutes = require("./routers/authRoutes.js");

//Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/", homeRouter);

app.use("/auth", authRoutes);

module.exports = { app };
