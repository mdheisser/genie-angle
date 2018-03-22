(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('stAutoAssignSearch', stAutoAssignSearch);

    stAutoAssignSearch.$inject = [];

    function stAutoAssignSearch() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            scope: {
                assigned: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            // Bind click event to input checkbox for selecting category.
            scope.$watch('assigned', function() {

                table.search(scope.assigned, 'auto_assign');

            });
        }
    }

})(angular);