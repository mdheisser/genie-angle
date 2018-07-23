const connectToDatabase = require('../../db');
const KeywordCategory = require('../../models/KeywordCategory');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      console.log('Get all keyword categories');
      KeywordCategory.find()
        .then(KeywordCategory => response.ok(KeywordCategory, callback))
        .catch(err => response.fail(err, callback))
    });
};