(function (angular) {
    angular
        .module("components.services")
        .service("REST", ["API", function (API) {
            //TODO: Replace by domain from const defined on main module
            var domain = 'http://localhost/api';
            return new API({
                domain: domain
            });
        }]);
})(angular);