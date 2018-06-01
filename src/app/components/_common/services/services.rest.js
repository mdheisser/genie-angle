(function (angular) {
    angular
        .module("components.services")
        .service("REST", ["API", function (API) {
            //TODO: Replace by domain from const defined on main module
            var domain = 'http://localhost/api'; // Mock server
            // var domain = 'https://bi7dw53x6i.execute-api.us-east-1.amazonaws.com/dev';  // Serverless
            // var domain = 'http://localhost:3000';  // Serverless offline
            return new API({
                domain: domain
            });
        }]);
})(angular);