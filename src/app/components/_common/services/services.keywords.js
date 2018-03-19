(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('keywordsService', keywordsService);

    keywordsService.$inject = ["REST"];

    function keywordsService(REST) {

        var getSites = function (userID) {
            return REST.getSites();
        };

        var getKeywords = function (siteID) {
            return REST.getKeywords({
                siteId: siteID
            });
        };

        var getKeywordDetail = function (keywordId) {
            return REST.getKeywordDetail({
                keywordId: keywordId
            });
        };

        var activePromotedKeyword = function (keywordId) {
            return REST.activePromotedKeyword({
                keywordId: keywordId
            });
        };

        var deactivePromotedKeyword = function (keywordId) {
            return REST.deactivePromotedKeyword({
                keywordId: keywordId
            });
        };

        var activeForcedKeyword = function (data) {
            return REST.activeForcedKeyword({
                data: data
            });
        };

        var activeMonitoredKeyword = function (keywordId) {
            return REST.activeMonitoredKeyword({
                keywordId: keywordId
            });
        };

        var deactiveMonitoredKeyword = function (keywordId) {
            return REST.deactiveMonitoredKeyword({
                keywordId: keywordId
            });
        };

        return {
            getSites: getSites,
            getKeywords: getKeywords,
            getKeywordDetail: getKeywordDetail,
            activePromotedKeyword: activePromotedKeyword,
            deactivePromotedKeyword: deactivePromotedKeyword,
            activeForcedKeyword: activeForcedKeyword,
            activeMonitoredKeyword: activeMonitoredKeyword,
            deactiveMonitoredKeyword: deactiveMonitoredKeyword
        };
    }

})(angular);