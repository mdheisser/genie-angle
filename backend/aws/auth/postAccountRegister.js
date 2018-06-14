import cognito from './common/cognito.js'

module.exports.main = (event, context, callback) => {
  var attributeList = [];
  var dataEmail = {
    Name: 'email',
    Value: event.body.username
  };

  var attributeEmail = new cognito.AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

  attributeList.push(dataEmail);

  userPool.signUp(event.body.username, event.body.password, attributeList, null, function (err, result) {
    if (err) {
      callback(null, {
        result: err
      });
      return;
    }
    var cognitoUser = result.user;
    callback(null, {
      result: cognitoUser
    });
  });

};