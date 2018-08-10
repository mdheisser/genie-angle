const connectToDatabase = require('../../db');
const Violation = require('../../models/Violation');
const response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        console.log('Get All Violations');
        Violation.find()
            .then(violations => response.ok(violations, callback))
            .catch(err => response.fail(err, callback))
    });
};