var AWS = require('aws-sdk');
var CognitoSDK = require('amazon-cognito-identity-js-node');

AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
AWS.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute;

const config = {
    region: 'us-west-2'
};
const UserPoolId = 'us-west-2_nqV6z3pyt';
const ClientId = '2r782a1n4erngt2h1a9cdlc4o6'; // Your App client id (add via Console->Cognito User Pool)

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(config);

const poolData = {
    UserPoolId: UserPoolId,
    ClientId: ClientId // Your App client id here
};
const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

module.exports = {
    userPool: userPool,
    poolData: poolData,
    cognitoIdentityServiceProvider: cognitoIdentityServiceProvider,
    config: config,
    UserPoolId: UserPoolId,
    ClientId: ClientId,
    AWS: AWS,
    CognitoSDK: CognitoSDK
}