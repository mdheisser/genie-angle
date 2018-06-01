const auth = require('./auth.js');
const sites = require('./sites.js');
const keywords = require('./keywords.js');
const pages = require('./pages.js');
const users = require('./users.js');

module.exports = {
  postAccountLogin: auth.postAccountLogin,
  postAccountRegister: auth.postAccountRegister,
  postAccountConfirm: auth.postAccountConfirm,
  getSites: sites.getSites,
  postSites: sites.postSites,
  getSitesCheckSite: sites.getSitesCheckSite,
  getKeywords: keywords.getKeywords,
  postKeywords: keywords.postKeywords,
  putKeywords: keywords.putKeywords,
  deleteKeywords: keywords.deleteKeywords,
  getPages: pages.getPages,
  postPages: pages.postPages,
  getPages: pages.getPages,
  putPages: pages.putPages,
  deletePages: pages.deletePages,
  getPageViolation: pages.getPageViolation,
  getUsers: users.getUsers,
  getUsers: users.getUsers,
};
