(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('fiterCondition', fiterCondition);

    fiterCondition.$inject = [];

    function fiterCondition() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            template: '<select selectpicker ng-model="selectedOption" ng-change="optionChanged(selectedOption)" ng-options="opt as opt.label for opt in conditionItems"></select>',
            scope: {},
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {

            scope.conditionItems = [
                {
                    label: 'Contains',
                    value: 1
                },
                {
                    label: 'Does not',
                    value: 2
                },
                {
                    label: 'Begins with',
                    value: 3
                },
                {
                    label: 'Ends with',
                    value: 4
                }
            ];

            scope.selectedOption = scope.conditionItems[0];
            localStorage.setItem('searchCondition', scope.conditionItems[0].value);

            // Save search condition on local storage and search by text.
            scope.optionChanged = function(option) {
                var condition = option.value;
                localStorage.setItem('searchCondition', condition);

                var searchText = localStorage.getItem('searchText');
                table.search(searchText, 'keyword');
            }

            // Remove local storage variables.
            scope.$on('destroy', function() {
                localStorage.removeItem('searchCondition');
                localStorage.removeItem('searchText');
            });
        }
    }

})(angular);