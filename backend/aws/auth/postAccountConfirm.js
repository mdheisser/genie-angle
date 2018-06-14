import cognito from './common/cognito.js'

module.exports.main = (event, context, callback) => {
  //User
  const userParams = {
    Pool: userPool,
    Username: event.body.username,
  };
  var cognitoUser = new cognito.AWS.CognitoIdentityServiceProvider.CognitoUser(userParams);

  cognitoUser.confirmRegistration(event.body.code, true, function (err, result) {
    if (err) {
      callback(null, {
        result: err
      });
      return;
    }
    callback(null, {
      result: result
    });
  });
};