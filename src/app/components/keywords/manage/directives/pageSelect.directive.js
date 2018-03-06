(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('pageSelect', pageSelect);

    pageSelect.$inject = [];

    function pageSelect() {
        var directive = {
            restrict: 'EA',
            template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            scope.$watch('currentPage', function(c) {
                scope.inputPage = c;
            });
        }
    }

})(angular);