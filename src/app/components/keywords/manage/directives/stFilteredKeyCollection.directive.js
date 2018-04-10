(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('stFilteredKeyCollection', stFilteredKeyCollection);

    stFilteredKeyCollection.$inject = [];

    function stFilteredKeyCollection() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            scope.$watch(table.getFilteredCollection, function(val){
                scope.filteredKeyCollection = val;
            });
        }
    }

})(angular);