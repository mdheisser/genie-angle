const connectToDatabase = require('../../db');
const Page = require('../../models/Page');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Page.findByIdAndUpdate(event.pathParameters.pageId, JSON.parse(event.body), { new: true })
        .then(pages => response.ok(pages, callback))
        .catch(err => response.fail(err, callback))
    });
};