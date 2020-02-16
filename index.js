const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = require("./src/config/config");
const apiRoute = require("./src/routes/api.route");
const dbRoute = require("./src/routes/db.route");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/api", apiRoute);
app.use("/db", dbRoute);
app.get("/", (req, res) => res.send(`Hello VAI`));

mongoose.set("useCreateIndex", true);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
  });
});
