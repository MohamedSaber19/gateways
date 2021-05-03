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

app.listen(5000);
