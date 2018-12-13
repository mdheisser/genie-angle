const connectToDatabase = require('../../db');
const Keyword = require('../../models/Keyword');
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

        if (event.queryStringParameters.pageId) {
          query['pageID'] = event.queryStringParameters.pageId
        }

        if (event.queryStringParameters.ids) {
          ids = event.queryStringParameters.ids.split(",");
          idsArr = [];
          for (key in ids) {
            idsArr.push(ids[key]);
          }
          query['_id'] = { $in: idsArr};
        }

        Keyword.find(query)
          .then(keywords => response.ok(keywords, callback))
          .catch(err => response.fail(err, callback))
      } else {
        console.log('Get All keywords');
        Keyword.find()
          .then(keywords => response.ok(keywords, callback))
          .catch(err => response.fail(err, callback))
      }
    });
};