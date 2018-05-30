var AWS          = require('aws-sdk');
var CognitoSDK   = require('amazon-cognito-identity-js-node');
AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;

const config = { region: 'us-west-2' };
const UserPoolId = 'us-west-2_nqV6z3pyt';
const ClientId = '2r782a1n4erngt2h1a9cdlc4o6'; // Your App client id (add via Console->Cognito User Pool)

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(config);

var Auth = {
  postAccountLogin: (event, context, callback) => {
    const poolData = {
      UserPoolId : UserPoolId,
      ClientId : ClientId // Your App client id here
    };
    const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    
    //User
    const userParams = {
      Pool: userPool,
      Username: Username,
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
        callback(null, { message: result });
      },
      onFailure: (err) => {
        callback(null, { message: err });
      }
    };
    cognitoUser.authenticateUser(authenticationDetails, responseFunctions);
  },
};

module.exports = Auth;