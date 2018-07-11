const connectToDatabase = require('../../db');
const Site = require('../../models/Site');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      console.log('Get all sites');
      Site.find()
        .then(sites => response.ok(sites, callback))
        .catch(err => response.fail(err, callback))
    });
};