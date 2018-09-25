(function (angular) {
    angular
        .module("components.services")
        .service("REST", ["API", function (API) {
            //TODO: Replace by domain from const defined on main module
            // var domain = 'http://localhost/api'; // Mock server
            var domain = 'https://0prbazspmj.execute-api.us-east-1.amazonaws.com/dev';  // Serverless
            // var domain = 'http://localhost:4000';  // Serverless offline
            return new API({
                domain: domain
            });
        }]);
})(angular);