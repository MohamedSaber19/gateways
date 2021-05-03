function isIPv4(ip) {
  var match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  return (
    match != null &&
    match[1] <= 255 &&
    match[2] <= 255 &&
    match[3] <= 255 &&
    match[4] <= 255
  );
}
module.exports = (req, res, next) => {
  if (!isIPv4(req.body.ip))
    return res.status(422).send({
      success: false,
      msg: "You've provided an invalid IPv4 address",
    });
  next();
};
