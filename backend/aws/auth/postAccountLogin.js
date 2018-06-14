import cognito from './common/cognito.js'

module.exports.main = (event, context, callback) => {
  const userParams = {
    Pool: userPool,
    Username: event.body.username,
  };
  var cognitoUser = new cognito.AWS.CognitoIdentityServiceProvider.CognitoUser(userParams);

  //Authentication
  const authenticationData = {
    Username: event.body.username,
    Password: event.body.password, //1st time use TempPassword
  }
  const authenticationDetails = new cognito.AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var responseFunctions = {
    onSuccess: (result) => {
      callback(null, {
        result: result
      });
    },
    onFailure: (err) => {
      callback(null, {
        result: err
      });
    }
  };
  cognitoUser.authenticateUser(authenticationDetails, responseFunctions);

};