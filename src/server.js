const { app } = require(".");
const mongoose = require("mongoose");

const PORT = 5454;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log("Server is running on port 5454");
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });
