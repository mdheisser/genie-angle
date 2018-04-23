(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('pagesService', pagesService);

    pagesService.$inject = ["REST"];

    function pagesService(REST) {

        var getPageViolation = function (pageID) {
            return REST.getPageViolation({
                pageId: pageID
            });
        };

        return {
            getPageViolation: getPageViolation
        };
    }

})(angular);