(function (angular) {
    'use strict';

    angular
        .module('components.directives')
        .directive('fiterCondition', fiterCondition);

    fiterCondition.$inject = [];

    function fiterCondition() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            template: '<select selectpicker ng-model="selectedOption" ng-change="optionChanged(selectedOption)" ng-options="opt as opt.label for opt in conditionItems"></select>',
            scope: {
                conditionFor: '@'
            },
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

                var searchText = $('#searchFor' + scope.conditionFor).val();
                table.search(searchText, scope.conditionFor);
            }

            // Remove local storage variables.
            scope.$on('destroy', function() {
                localStorage.removeItem('searchCondition');
            });
        }
    }

})(angular);