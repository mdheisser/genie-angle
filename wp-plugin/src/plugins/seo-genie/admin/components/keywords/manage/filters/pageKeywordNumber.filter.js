(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('pageKeywordNumber', pageKeywordNumber)

    pageKeywordNumber.$inject = [];

    function pageKeywordNumber() {

        return function (input) {
            var output = '';

            if (input.manual_keywords > 0) {
                output = '(' + input.manual_keywords + ')' + (input.auto_keywords + input.manual_keywords);
            } else {
                output = input.auto_keywords;
            }

            return output;
        };
    }

})(angular);