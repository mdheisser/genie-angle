(function(angular, rest) {
    angular
        .module("REST", [])
        .service("REST", API.Client.DefaultApi);
})(angular, API.Client);