(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('stReset', stReset);

    stReset.$inject = [];

    function stReset() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            scope: {
                model: '=ngModel'
            },
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            scope.$watch('model', function(newValue, OldValue) {
                if (newValue === false) {
                    var tableState = table.tableState();
                    tableState.search.predicateObject = {};
                    tableState.pagination.start = 0;
                    table.pipe();
                }
            });
        }
    }

})(angular);