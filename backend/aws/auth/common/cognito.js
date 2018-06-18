const
    CognitoSDK = require('amazon-cognito-identity-js-node'),
    AWS = require('aws-sdk');

module.exports = function () {
    let config = {
            region: 'us-west-2'
        },
        UserPoolId = 'us-west-2_nqV6z3pyt',
        ClientId = '2r782a1n4erngt2h1a9cdlc4o6', // Your App client id (add via Console->Cognito User Pool)
        poolData = {
            UserPoolId: UserPoolId,
            ClientId: ClientId // Your App client id here
        },
        cognitoIdentityServiceProvider = null,
        userPool = null;

    AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
    AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
    AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
    AWS.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute;
    cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(config);
    userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    return {
        userPool: userPool,
        poolData: poolData,
        cognitoIdentityServiceProvider: cognitoIdentityServiceProvider,
        config: config,
        UserPoolId: UserPoolId,
        ClientId: ClientId,
        AWS: AWS,
        CognitoSDK: CognitoSDK
    }
}