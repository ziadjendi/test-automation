const newman = require("newman");
const config = require("config");

const apiKey = config.get("apikey");
const baseUrl = "https://api.getpostman.com";
const callback = (error, summary) => {
  if (error || summary.error) {
    error && console.error(error.message);
    summary && summary.error && console.error(summary.error.message);
  }
};

const test = (coll, env, folder = null) => {
  let environment = env.includes(baseUrl)
    ? env
    : `${baseUrl}/environments/${env}?apikey=${apiKey}`;
  const collection = `${baseUrl}/collections/${coll}?apikey=${apiKey}`;

  const options = {
    collection,
    environment,
    folder,
    reporters: ["cli", "html"],
    reporter: {
      html: { export: "./reports/htmlResults.html" },
    },
  };

  newman
    .run(options, callback)
    .on("start", (err, args) => {
      console.log("running a collection...");
    })
    .on("beforeDone", (err, summary) => {
      environment = summary.environment;
    })
    .on("done", (err, summary) => {
      if (err || summary.error) {
        console.log("collection run encountered an error.");
      } else {
        console.log("collection run completed.");
        // return environment;
      }
    });
  return environment;
};

module.exports = test;
