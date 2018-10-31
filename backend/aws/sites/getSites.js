const connectToDatabase = require('../../db');
const Site = require('../../models/Site');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      var query = {};

      if (event.queryStringParameters && event.queryStringParameters.userId) {
        query['userID'] = event.queryStringParameters.userId
      }

      if (event.queryStringParameters && event.queryStringParameters.url) {
        query['url'] = event.queryStringParameters.url
      }
      
      Site.find(query)
        .then(sites => response.ok(sites, callback))
        .catch(err => response.fail(err, callback))
    });
};
