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

  //Authentication
  let authenticationData = {
    Username: body.username,
    Password: body.password
  }
  let authenticationDetails = new cognito.AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var responseFunctions = {
    onSuccess: (result) => {
      result.ok(result, callback);
    },
    onFailure: (err) => {
      result.ok(err, callback, NOT_AUTORIZED);
    },
    mfaRequired: function (codeDeliveryDetails) {
      // MFA is required to complete user authentication. 
      // Get the code from user and call 
      // cognitoUser.sendMFACode(mfaCode, this);
      result.ok('MFACODE', callback, MFACODE);
    },

    newPasswordRequired: function (userAttributes, requiredAttributes) {
      // User was signed up by an admin and must provide new 
      // password and required attributes, if any, to complete 
      // authentication.

      // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
      // Required attributes according to schema, which don’t have any values yet, will have blank values.
      // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.


      // Get these details and call 
      // newPassword: password that user has given
      // attributesData: object with key as attribute name and value that the user has given.
      // cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this)

      result.ok('RESET_PASSWORD', callback, RESET_PASSWORD);
    }
  };
  cognitoUser.authenticateUser(authenticationDetails, responseFunctions);

};