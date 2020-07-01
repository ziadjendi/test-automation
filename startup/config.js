const config = require("config");

module.exports = function () {
  if (!config.get("apikey")) {
    throw new Error("FATAL ERROR: Postman API Key is not defined.");
  }
};
