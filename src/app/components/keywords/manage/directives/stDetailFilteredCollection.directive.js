(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('stDetailFilteredCollection', stDetailFilteredCollection);

    stDetailFilteredCollection.$inject = [];

    function stDetailFilteredCollection() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            scope.$watch(table.getFilteredCollection, function(val){
                localStorage.setItem('detailFilteredCollection', JSON.stringify(val));
            });

            // Remove local storage variables.
            scope.$on('destroy', function() {
                localStorage.removeItem('detailFilteredCollection');
            });
        }
    }

})(angular);