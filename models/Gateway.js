const mongoose = require("mongoose");
const { Schema } = mongoose;
const DeviceSchema = require("./Device");

const gatewaySchema = new Schema({
  name: String,
  ip: String,
  devices: [DeviceSchema],
});

mongoose.model("Gateways", gatewaySchema);
