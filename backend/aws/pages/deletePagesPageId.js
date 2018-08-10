const connectToDatabase = require('../../db');
const Page = require('../../models/Page');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Page.findByIdAndRemove(event.pathParameters.pageId)
        .then(pages => response.ok(pages, callback))
        .catch(err => response.fail(err, callback))
    });
};