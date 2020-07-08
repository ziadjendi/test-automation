const { getCollections, getEnvironments } = require("./routes/postmanAPI");
const test = require("./services/testRunner.js");
const admin = require("./routes/adminConsole");
const postmanAPI = require("./routes/postmanAPI");
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
//   "11843676-adedbc40-581b-4814-acce-e9553f117f5f",
//   "Login"
// );
const options = {
  workflows: "Login",
  environment: "prod",
  workflowGroups: "Teachers App",
  variables: {},
};
admin.runTest(options);
// admin.setEnvironmentVars("dev", {
//   bar: 15,
//   HOSTNAME: "https://abjadiyat-web-api-dev.abjadiyat.com",
//   // HOSTNAME: "https://dev.abjadiyat.com",
//   // vars: { key1: "val1", key2: "val2" },
// });

// const payload = {
//   environment: {
//     id: "81a02c5e-b640-4a32-b68a-585891214502",
//     name: "dev",
//     values: [
//       {
//         key: "HOSTNAME",
//         value: "https://abjadiyat-web-api-dev.abjadiyat.com",
//       },
//       {
//         key: "payloads",
//         value:
//           '[{ "_contactType": "mobile", "_emailOrMobile": "971562094980" }, { "_contactType": "email", "_emailOrMobile": "anju@ibdaa.com" }]',
//       },
//       {
//         key: "pinCode",
//         value: "2148",
//       },
//     ],
//   },
// };
// postmanAPI.getEnvironment("81a02c5e-b640-4a32-b68a-585891214502");
