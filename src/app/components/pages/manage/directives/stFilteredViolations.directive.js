(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .directive('stFilteredViolations', stFilteredViolations);

    stFilteredViolations.$inject = [];

    function stFilteredViolations() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            scope.$watch(table.getFilteredCollection, function(val){
                localStorage.setItem('filteredViolations', JSON.stringify(val));
            });

            // Remove local storage variables.
            scope.$on('destroy', function() {
                localStorage.removeItem('filteredViolations');
            });
        }
    }

})(angular);