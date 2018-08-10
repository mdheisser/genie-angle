const connectToDatabase = require('../../db');
const Violation = require('../../models/Violation');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Violation.create(JSON.parse(event.body))
        .then(violation => response.ok(violation, callback))
        .catch(err => response.fail(err, callback))
    });
};