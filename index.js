const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const keys = require("./config/keys");
const CONNECTION_URL = keys.CONNECTION_URL;
require("./models/Gateway");
require("./models/Device");

mongoose.connect(CONNECTION_URL, {
  //connecting to our mongoDB with mongoose
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/gatewayRoutes")(app);
require("./routes/deviceRoutes")(app);

// Handle express server in Production
if (process.env.NODE_ENV === "production") {
  // Express will server our production assets like main.js & main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't reconize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000);
