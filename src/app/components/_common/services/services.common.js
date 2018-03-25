(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('commonService', commonService);

    commonService.$inject = ["REST"];

    function commonService(REST) {

        var getSites = function (userID) {
            return REST.getSites();
        };

        return {
            getSites: getSites
        };
    }

})(angular);