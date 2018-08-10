const connectToDatabase = require('../../db');
const Page = require('../../models/Page');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        console.log('Get a page data');
        Page.findById(event.pathParameters.pageId)
            .populate('autoKeywordIDs')
            .populate('violations')
            .then(page => response.ok(page, callback))
            .catch(err => response.fail(err, callback))
    });
};