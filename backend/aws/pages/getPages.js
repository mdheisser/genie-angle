const connectToDatabase = require('../../db');
const Page = require('../../models/Page');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        if (event.queryStringParameters) {
            console.log('Get Pages of user own site');
            Page.find({ "siteID" : event.queryStringParameters.siteId })
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