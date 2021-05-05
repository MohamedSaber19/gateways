const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceSchema = new Schema({
  uid: Number,
  vendor: String,
  creationDate: Date,
  status: String,
});

module.exports = deviceSchema;
