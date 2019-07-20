const route = require("path-match");

module.exports = {
  order: {
    success: route("/order/success/:tracking_id")
  }
};
