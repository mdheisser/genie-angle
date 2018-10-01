(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('commonService', commonService);

    commonService.$inject = ["REST"];

    function commonService(REST) {

        var getUserSites = function (userID) {
            return REST.getUserSites({
                userId: userID
            });
        };

        return {
            getUserSites: getUserSites
        };
    }

})(angular);