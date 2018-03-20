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

        var activeDefaultKeyword = function (keywordId) {
            return REST.activeDefaultKeyword({
                keywordId: keywordId
            });
        };

        var deactiveDefaultKeyword = function (keywordId) {
            return REST.deactiveDefaultKeyword({
                keywordId: keywordId
            });
        };

        var activeForcedKeyword = function (keywordId) {
            return REST.activeForcedKeyword({
                keywordId: keywordId
            });
        };

        var deactiveForcedKeyword = function (keywordId) {
            return REST.deactiveForcedKeyword({
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
            activeDefaultKeyword: activeDefaultKeyword,
            deactiveDefaultKeyword: deactiveDefaultKeyword,
            activeForcedKeyword: activeForcedKeyword,
            deactiveForcedKeyword: deactiveForcedKeyword,
            activePromotedKeyword: activePromotedKeyword,
            deactivePromotedKeyword: deactivePromotedKeyword,
            activeMonitoredKeyword: activeMonitoredKeyword,
            deactiveMonitoredKeyword: deactiveMonitoredKeyword
        };
    }

})(angular);