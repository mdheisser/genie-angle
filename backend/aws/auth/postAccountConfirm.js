const cognito = require('./common/cognito.js')(),
  response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  let body = JSON.parse(event.body);
  //User
  const userParams = {
    Pool: cognito.userPool,
    Username: body.username,
  };
  var cognitoUser = new cognito.AWS.CognitoIdentityServiceProvider.CognitoUser(userParams);

  cognitoUser.confirmRegistration(body.code, true, function (err, result) {
    if (err) {
      response.fail(err, callback);
      return;
    }
    response.ok(result, callback);
  });
};