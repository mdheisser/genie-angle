const connectToDatabase = require('../../db');
const Page = require('../../models/Page');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      if (event.queryStringParameters) {
        var query = {};

        if (event.queryStringParameters.siteId) {
          query['siteID'] = event.queryStringParameters.siteId
        }

        if (event.queryStringParameters.pageUrl) {
          query['pageUrl'] = event.queryStringParameters.pageUrl
        }

        Page.find(query)
          .then(pages => response.ok(pages, callback))
          .catch(err => response.fail(err, callback))
      } else {
        console.log('Get All Pages');
        Page.find()
          .then(pages => response.ok(pages, callback))
          .catch(err => response.fail(err, callback))
      }
    });
};