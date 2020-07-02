const { getCollections, getEnvironments } = require("./routes/postmanAPI");
const test = require("./services/testRunner.js");
const admin = require("./routes/adminConsole");
require("./startup/config")();

// getEnvironments().then(console.log).catch(console.error);
//11843676-fd187779-f1f9-4b33-a5de-55f5a886a684
// getCollections().then(console.log).catch(console.error);
//11843676-d8d97e3c-4efb-4a78-849c-e76b2b181058
// test(
//   "11843676-d8d97e3c-4efb-4a78-849c-e76b2b181058",
//   "11843676-fd187779-f1f9-4b33-a5de-55f5a886a684"
// );
// test(
//   "11843676-dadb3174-cfce-46fd-90cf-9c5c6ccaeed9",
//   "11843676-fd187779-f1f9-4b33-a5de-55f5a886a684",
//   "Dashboard"
// );

admin.listEnvironments();
