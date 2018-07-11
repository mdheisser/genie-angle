const connectToDatabase = require('../../db');
const Keyword = require('../../models/Keyword');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      console.log('Get all keywords');
      Keyword.find()
        .then(keywords => response.ok(keywords, callback))
        .catch(err => response.fail(err, callback))
    });
};