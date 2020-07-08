const pmapi = require("./postmanAPI");
const _ = require("lodash");
const test = require("../services/testRunner");

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

const getEnvironment = async (environmentName) => {
  const environmentUID = await getEnvironmentUID(environmentName);
  const payload = await pmapi.getEnvironment(environmentUID);
  return payload;
};

const setEnvironmentVars = async (environmentName, variables) => {
  const { environment } = await getEnvironment(environmentName);
  for (const varName of Object.keys(variables)) {
    const existVar = environment.values.find(
      (varObj) => varObj.key === varName
    );
    const varValue =
      typeof variables[varName] === "string"
        ? variables[varName]
        : JSON.stringify(variables[varName]);
    if (existVar) {
      const index = environment.values.indexOf(existVar);
      console.log(existVar.key);
      existVar.value = varValue;
      environment.values[index] = existVar;
    } else {
      const newVar = {
        key: varName,
        value: varValue,
      };
      environment.values.push(newVar);
    }
  }
  const envUID = await getEnvironmentUID(environmentName);
  const data = await pmapi.updateEnvironment(envUID, { environment });
  console.log(data);
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

const runTest = async ({
  workflows = [],
  environment = "prod",
  workflowGroups = [],
  variables: {},
}) => {
  console.log("workflows", workflows);
  console.log("environment", environment);
  console.log("workflowGroups", workflowGroups);
  const collectionName = "Abjadiyat";
  const collectionUID = await getCollectionUID(collectionName);
  const environmentUID = await getEnvironmentUID(environment);
  if (!workflows.length && !workflowGroups.length) {
    console.log("Run all tests");
    // run the full test in Abjadiyat collection
    test(collectionUID, environmentUID);
  } else {
    const collection = await pmapi.getCollection(collectionUID);
    for (const wfGroup of collection.item) {
      if (
        (workflowGroups && workflowGroups.includes(wfGroup.name)) ||
        !workflowGroups.length
      ) {
        for (const wf of wfGroup.item) {
          if (!workflows.includes(wf.name) && workflows.length) {
            const index = wfGroup.item.indexOf(wf);
            delete wfGroup.item[index];
          }
        }
        wfGroup.item = _.compact(wfGroup.item);
      } else {
        const index = collection.item.indexOf(wfGroup);
        delete collection.item[index];
      }
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
  setEnvironmentVars,
  runTest,
};
