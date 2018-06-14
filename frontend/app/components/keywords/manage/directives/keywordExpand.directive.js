(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('keywordExpand', keywordExpand);

    keywordExpand.$inject = [];

    function keywordExpand() {
        var directive = {
            restrict: 'EA',
             templateUrl: '/app/components/keywords/manage/templates/expandedKeyword.html',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            //
        }
    }

})(angular);