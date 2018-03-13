(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('keywordsService', keywordsService);

    keywordsService.$inject = ["REST"];

    function keywordsService(REST) {

        var getKeywords = function (siteID) {
            return REST.getKeywords({
                siteId: siteID
            });
        };

        var getKeywordDetail = function (keywordId) {
            return REST.getKeywordDetail({
                keywordId: keywordId
            });
        }

        return {
            getKeywords: getKeywords,
            getKeywordDetail: getKeywordDetail
        };
    }

})(angular);