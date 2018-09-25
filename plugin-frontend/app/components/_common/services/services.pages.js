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

        var updatePage = function (id, page) {
            return REST.updatePage({
                pageId: id,
                page: page
            });
        };

        var getPageDetail = function (id) {
            return REST.getPageDetail({
                pageId: id
            });
        };

        var getPageViolation = function (pageID) {
            return REST.getPageViolation({
                pageId: pageID
            });
        };

        return {
            getPages: getPages,
            updatePage: updatePage,
            getPageDetail: getPageDetail,
            getPageViolation: getPageViolation
        };
    }

})(angular);