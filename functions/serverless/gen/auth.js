var AWS          = require('aws-sdk');
var CognitoSDK   = require('amazon-cognito-identity-js-node');

AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
AWS.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute;

const config = { region: 'us-west-2' };
const UserPoolId = 'us-west-2_nqV6z3pyt';
const ClientId = '2r782a1n4erngt2h1a9cdlc4o6'; // Your App client id (add via Console->Cognito User Pool)

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(config);

const poolData = {
  UserPoolId : UserPoolId,
  ClientId : ClientId // Your App client id here
};
const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

var Auth = {
  postAccountLogin: (event, context, callback) => {
    //User
    const userParams = {
      Pool: userPool,
      Username: event.body.username,
    };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userParams);

    //Authentication
    const authenticationData = {
      Username: event.body.username,
      Password: event.body.password, //1st time use TempPassword
    }
    const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var responseFunctions = {
      onSuccess: (result) => {
        callback(null, { result: result });
      },
      onFailure: (err) => {
        callback(null, { result: err });
      }
    };
    cognitoUser.authenticateUser(authenticationDetails, responseFunctions);
  },
  postAccountRegister: (event, context, callback) => {
    var attributeList = [];
    
    var dataEmail = {
      Name : 'email',
      Value : event.body.username
    };

    var attributeEmail = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(dataEmail);

    userPool.signUp(event.body.username, event.body.password, attributeList, null, function(err, result){
      if (err) {
        callback(null, { result: err });
        return;
      }
      var cognitoUser = result.user;
      callback(null, { result: cognitoUser });
    });
  },
  postAccountConfirm: (event, context, callback) => {
    //User
    const userParams = {
      Pool: userPool,
      Username: event.body.username,
    };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userParams);

    cognitoUser.confirmRegistration(event.body.code, true, function(err, result) {
      if (err) {
        callback(null, { result: err });
        return;
      }
      callback(null, { result: result });
    });
  },
};

module.exports = Auth;
