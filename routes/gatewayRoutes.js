const mongoose = require("mongoose");
const validateIPv4 = require("../middlewares/validateIPv4");

const Gateway = mongoose.model("Gateways");

module.exports = (app) => {
  // get single gateway
  app.get("/api/gateways/:gatewayId", async (req, res) => {
    const { gatewayId } = req.params;
    const gateway = await Gateway.findById(gatewayId);
    res.send(gateway);
  });

  // get all gateways
  app.get("/api/gateways", async (req, res) => {
    const gateways = await Gateway.find({});
    res.send(gateways);
  });

  // add new gateway
  app.post("/api/gateways", validateIPv4, async (req, res) => {
    const { name, ip, devices } = req.body;
    const gateway = new Gateway({
      name,
      ip,
      devices,
    });

    try {
      await gateway.save();
      res.send({ success: true, data: gateway });
    } catch (error) {
      res.status(422).send({ success: false, msg: error.message });
    }
  });

  // delete gateway
  app.delete("/api/gateways/:gatewayId", async (req, res) => {
    const { gatewayId } = req.params;
    try {
      await Gateway.findByIdAndDelete(gatewayId);
      res.send({ success: true });
    } catch (error) {
      res.status(422).send({
        success: false,
        msg: error.message,
      });
    }
  });
};
