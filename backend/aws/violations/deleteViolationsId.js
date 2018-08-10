const connectToDatabase = require('../../db');
const Violation = require('../../models/Violation');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Violation.findByIdAndRemove(event.pathParameters.id)
        .then(violation => response.ok(violation, callback))
        .catch(err => response.fail(err, callback))
    });
};