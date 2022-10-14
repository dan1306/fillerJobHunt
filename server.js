const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/users", require("./routes/api/users"));
app.use(require("./config/auth"));
app.use("/api/interviewing", require("./routes/api/interviewing"));
app.use("/api/applied", require("./routes/api/applied"));
app.use("/api/interested", require("./routes/api/interested"));
app.use("/api/offer", require("./routes/api/offer"));
app.use("/api/hunt", require("./routes/api/hunt"));
app.use("/api/summary", require("./routes/api/summary"));

app.use(express.static(path.join(__dirname, "build")));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
