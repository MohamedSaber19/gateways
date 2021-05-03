const mongoose = require("mongoose");

const Gateway = mongoose.model("Gateways");

module.exports = (app) => {
  // get single device
  app.get("/api/devices/:deviceId", async (req, res) => {
    const { deviceId } = req.params;
    const { gatewayId } = req.body;
    const gateway = await Gateway.findById(gatewayId);
    const device = gateway.devices.id(deviceId);
    res.send(device);
  });

  // add new device
  app.post("/api/devices/:gatewayId", async (req, res) => {
    const { uid, vendor, status } = req.body;
    const { gatewayId } = req.params;

    const gateway = await Gateway.findById(gatewayId);
    if (gateway.devices.length < 10) {
      gateway.devices.push({
        uid,
        vendor,
        creationDate: new Date(),
        status,
      });
      gateway.save(function (err, response) {
        if (err) res.status(422).send({ success: false, msg: err.message });
        const addedDevice = response.devices.find(
          (device) => device.uid === uid
        );
        res.send({ success: true, data: addedDevice });
      });
    } else {
      res.status(422).send({
        success: false,
        msg: "You can't add more than 10 devices to a gateway",
      });
    }
  });

  // delete device
  app.delete("/api/devices/:deviceId", async (req, res) => {
    const { gatewayId } = req.body;
    const { deviceId } = req.params;

    const gateway = await Gateway.findById(gatewayId);
    gateway && gateway.devices.id(deviceId).remove();

    gateway.save(function (err, response) {
      if (err) res.status(422).send({ success: false, msg: error.message });
      res.send({ success: true, data: response });
    });
  });
};
