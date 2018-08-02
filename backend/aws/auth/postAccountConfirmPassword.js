const cognito = require('./common/cognito.js')(),
  result = require('../_common/response'),
  NOT_AUTORIZED = 401,
  RESET_PASSWORD = 401.1,
  MFACODE = 403;

module.exports.main = (event, context, callback) => {
  let body = JSON.parse(event.body);

  let userParams = {
    Pool: cognito.userPool,
    Username: body.username,
  };
  let cognitoUser = new cognito.AWS.CognitoIdentityServiceProvider.CognitoUser(userParams);

  var responseFunctions = {
    onSuccess: () => {
      result.ok({message: 'success'}, callback);
    },
    onFailure: (err) => {
      result.ok(err, callback);
    }
  };

  cognitoUser.confirmPassword(body.verificationCode, body.password, responseFunctions);

};