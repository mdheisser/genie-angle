const connectToDatabase = require('../../db');
const Keyword = require('../../models/Keyword');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        if (event.queryStringParameters) {
            console.log('Get keywords of user own site');
            Keyword.find({ "siteID" : event.queryStringParameters.siteId })
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