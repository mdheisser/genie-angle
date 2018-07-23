const connectToDatabase = require('../../db');
const KeywordCategory = require('../../models/KeywordCategory');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      KeywordCategory.create(JSON.parse(event.body))
        .then(KeywordCategory => response.ok(KeywordCategory, callback))
        .catch(err => response.fail(err, callback))
    });
};