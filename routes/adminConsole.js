const pmapi = require("./postmanAPI");
const _ = require("lodash");
const test = require("../services/testRunner");
const { getCollection } = require("./postmanAPI");

const listCollections = async () => {
  const { collections } = await pmapi.getCollections();
  const list = collections.map((coll) => coll.name);
  //   console.log(list);
  return collections;
};

const getCollectionUID = async (collectionName) => {
  const { collections } = await pmapi.getCollections();
  const coll = collections.find((coll) => coll.name === collectionName);
  //   console.log(coll.uid);
  return coll.uid;
};

const listEnvironments = async () => {
  const envs = await pmapi.getEnvironments();
  //   console.log(envs);
  return envs;
};

const getEnvironmentUID = async (environmentName) => {
  const { environments } = await pmapi.getEnvironments();
  const env = environments.find((env) => env.name === environmentName);
  //   console.log(env.uid);
  return env.uid;
};

const WorkflowGroups = async (collectionID) => {
  const { collection } = await pmapi.getCollection(collectionID);
  const groups = collection.item;
  //   console.log(groups.map((group) => group.name));
  return groups;
};

const listWorkflows = async (groupName) => {
  const collections = await listCollections();
  let groupInfo = null;
  for (const coll of collections) {
    const groups = await WorkflowGroups(coll.uid);
    groupInfo = groups.find((group) => group.name === groupName);

    if (groupInfo) {
      groupInfo.collectionID = coll.uid;
      break;
    }
  }
  const workflows = groupInfo.item.map((wf) => wf.name);
  //   console.log(workflows);
  const result = { collectionID: groupInfo.collectionID, workflows };
  console.log(result);
  return result;
};

const runTest = async (environment = "prod", workflows) => {
  const collectionName = "Abjadiyat";
  const collectionUID = await getCollectionUID(collectionName);
  const environmentUID = await getEnvironmentUID(environment);
  if (!workflows) {
    // run the full test in Abjadiyat collection
    test(collectionUID, environmentUID);
  } else {
    const collection = await pmapi.getCollection(collectionUID);
    for (const wfGroup of collection.item) {
      for (const wf of wfGroup.item) {
        if (!workflows.includes(wf.name)) {
          const index = wfGroup.item.indexOf(wf);
          delete wfGroup.item[index];
        }
      }
      wfGroup.item = _.compact(wfGroup.item);
    }
    // console.log(collection);
    await test(collection, environmentUID);
  }
};

module.exports = {
  listCollections,
  getCollectionUID,
  WorkflowGroups,
  listWorkflows,
  listEnvironments,
  getEnvironmentUID,
  runTest,
};
