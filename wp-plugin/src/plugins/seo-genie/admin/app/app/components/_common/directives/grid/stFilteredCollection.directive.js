(function (angular) {
    'use strict';

    angular
        .module('components.directives')
        .directive('stFilteredCollection', stFilteredCollection);

    stFilteredCollection.$inject = [];

    function stFilteredCollection() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            scope.$watch(table.getFilteredCollection, function(val){
                scope[attr.stFilteredCollection] = val;
            });
        }
    }

})(angular);