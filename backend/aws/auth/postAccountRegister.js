const cognito = require('./common/cognito.js')(),
  response = require('../_common/response');

module.exports.main = (event, context, callback) => {
  var attributeList = [];
  let body = JSON.parse(event.body);

  var dataEmail = {
    Name: 'email',
    Value: body.username
  };

  var attributeEmail = new cognito.AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

  attributeList.push(dataEmail);
  attributeList.push(attributeEmail);

  cognito.userPool.signUp(body.username, body.password, attributeList, null, function (err, result) {
    if (err) {
      response.fail(err, callback);
      return;
    }
    var cognitoUser = result.user;
    response.ok(cognitoUser, callback);
  });

};