(function (angular) {
    angular
        .module("services")
        .service("REST", ["API", function (API) {
            //TODO: Replace by domain from const defined on main module
            var domain = 'http://localhost/api';
            return new API({
                domain: domain
            });
        }]);
})(angular);