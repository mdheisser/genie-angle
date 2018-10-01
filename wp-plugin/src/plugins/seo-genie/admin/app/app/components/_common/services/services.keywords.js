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

        var createKeyword = function (keyword) {
            return REST.createKeyword({
                keyword: keyword
            });
        };

        var updateKeyword = function (id, keyword) {
            return REST.updateKeyword({
                id: id,
                keyword: keyword
            });
        };

        var getKeywordCategory = function () {
            return REST.getKeywordCategory();
        };

        return {
            getKeywords: getKeywords,
            createKeyword: createKeyword,
            updateKeyword: updateKeyword,
            getKeywordCategory: getKeywordCategory
        };
    }

})(angular);