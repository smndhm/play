const axios = require("axios").create({
  // baseURL: "http://localhost:5001/playback-smndhm/europe-west1/app/api",
  baseURL: "https://europe-west1-playback-smndhm.cloudfunctions.net/app/api",
});

/**
 * Set Axios Headers
 * @param {string} platform
 * @param {string} access_token
 */
exports.setHeaders = (platform, access_token) => {
  axios.defaults.headers.common["platform"] = platform;
  axios.defaults.headers.common["access-token"] = access_token;
};

/**
 * API call
 * @param {string} url
 * @param {object} params
 */
const api = async (method, url) => {
  // request
  const { data } = await axios({ method, url });
  // respond
  return data;
};

/**
 * Create list
 */
exports.createList = async () => {
  return api("POST", "/list");
};

/**
 * Get lists
 */
exports.getLists = async () => {
  return api("GET", "/list");
};

/**
 * Get list
 */
exports.getList = async (id) => {
  return api("GET", `/list/${id}`);
};

/**
 * Join list
 */
exports.joinList = async (id) => {
  return api("POST", `/list/${id}/join`);
};

/**
 * Leave list
 */
exports.leaveList = async (id) => {
  return api("POST", `/list/${id}/leave`);
};
