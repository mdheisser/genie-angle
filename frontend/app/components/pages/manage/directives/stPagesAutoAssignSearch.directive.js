(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .directive('stPagesAutoAssignSearch', stPagesAutoAssignSearch);

    stPagesAutoAssignSearch.$inject = [];

    function stPagesAutoAssignSearch() {
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