const { getCollections, getEnvironments } = require("./routes/postmanAPI");
const test = require("./services/testRunner.js");
require("./startup/config")();

// getEnvironments().then(console.log).catch(console.error);
//11843676-b9950e15-2c9b-4d8c-a3a8-fca5f651cd02
// getCollections().then(console.log).catch(console.error);
//11843676-d8d97e3c-4efb-4a78-849c-e76b2b181058
test(
  "11843676-d8d97e3c-4efb-4a78-849c-e76b2b181058",
  "11843676-b9950e15-2c9b-4d8c-a3a8-fca5f651cd02"
);
