(function (angular, AWS) {
    angular
        .module("components.aws")
        .service("AWS", ['AWS_CONF', function (conf) {
            return new AWS(conf);
        }]);
})(angular, AWS);