const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRoutes");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/", homeRouter);

module.exports = { app };
