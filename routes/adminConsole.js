const pmapi = require("./postmanAPI");
const _ = require("lodash");
const test = require("../services/testRunner");

const listCollections = async () => {
  const { collections } = await pmapi.getCollections();
  const list = collections.map((coll) => coll.name);
  //   console.log(list);
  return collections;
};

const listEnvironments = async () => {
  const envs = await pmapi.getEnvironments();
  //   console.log(envs);
  return envs;
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

module.exports = {
  listCollections,
  WorkflowGroups,
  listWorkflows,
  listEnvironments,
};
