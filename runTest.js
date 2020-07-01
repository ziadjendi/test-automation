const newman = require("newman");
const postmanAPI = "https://api.getpostman.com";
const apiKey =
  "PMAK-5efb2ec90e27890042b72c1e-ea005a63190f8a63ce06f6b9f3a137edea";
//   "PMAK-5ef972d3b9812e003bbd4e75-7c0ec08aa4773d9a73c1276f66e96defd6";

const options = {
  collection: `${postmanAPI}/collections/11843676-d8d97e3c-4efb-4a78-849c-e76b2b181058?apikey=${apiKey}`,
  //   collection: `${postmanAPI}/collections/2078055-431e01bd-e75e-4ba9-b4f0-f004b0c68b34?apikey=${apiKey}`,
  //   collection: `${postmanAPI}/collections/2078055-fdcc4662-391b-422b-8906-de2b7c2a2d5e?apikey=${apiKey}`,
  environment: `${postmanAPI}/environments/11843676-b9950e15-2c9b-4d8c-a3a8-fca5f651cd02?apikey=${apiKey}`,
  //   environment: `${postmanAPI}/environments/2078055-88f2ceac-b4f0-42a6-878e-f3ccdddcba13?apikey=${apiKey}`,
  //   folder: "Web-Mobile-Workflows",
  reporters: ["cli", "html"],
  //   reporters: ["cli", "json", "junit", "progress", "emojitrain", "html"],
  reporter: {
    html: { export: "./reports/htmlResults.html" },
    // json: { export: "./reports/jsonResults.json" },
    // junit: { export: "./reports/junitResults.xml" },
  },
};

const callback = (error, summary) => {
  if (error || summary.error) {
    error && console.error(error.message);
    summary && summary.error && console.error(summary.error.message);
  }
};

newman
  .run(options, callback)
  .on("start", (err, args) => {
    console.log("running a collection...");
  })
  .on("done", (err, summary) => {
    if (err || summary.error) {
      console.log("collection run encountered an error.");
    } else {
      console.log("collection run completed.");
    }
  });
