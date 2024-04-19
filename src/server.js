const { app } = require(".");

const PORT = 3000;

app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);
});
