(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('pagesService', pagesService);

    pagesService.$inject = ["REST"];

    function pagesService(REST) {

        var getPages = function (siteID) {
            return REST.getPages({
                siteId: siteID
            });
        };

        var getPageViolation = function (pageID) {
            return REST.getPageViolation({
                pageId: pageID
            });
        };

        return {
            getPages: getPages,
            getPageViolation: getPageViolation
        };
    }

})(angular);