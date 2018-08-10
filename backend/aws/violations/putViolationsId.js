const connectToDatabase = require('../../db');
const Violation = require('../../models/Violation');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Violation.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(violation => response.ok(violation, callback))
        .catch(err => response.fail(err, callback))
    });
};