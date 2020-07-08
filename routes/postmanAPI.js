const config = require("config");
const http = require("../services/http");

const baseUrl = "https://api.getpostman.com";
const collectionsUrl = baseUrl + "/collections";
const environmentsUrl = baseUrl + "/environments";
function envUrl(id) {
  return environmentsUrl + "/" + id;
}
const apikey = config.get("apikey");
const headers = {
  "x-api-key": apikey,
};

const getCollections = async () => {
  try {
    const { data } = await http.get(collectionsUrl, { headers });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getCollection = async (id) => {
  try {
    const {
      data: { collection },
    } = await http.get(collectionsUrl + "/" + id, { headers });
    return collection;
  } catch (error) {
    console.log(error);
  }
};
const getEnvironments = async () => {
  try {
    const { data } = await http.get(environmentsUrl, { headers });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getEnvironment = async (id) => {
  try {
    const { data } = await http.get(envUrl(id), { headers });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateEnvironment = async (id, payload) => {
  try {
    const { data } = await http.put(envUrl(id), payload, { headers });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCollections,
  getCollection,
  getEnvironments,
  getEnvironment,
  updateEnvironment,
};
