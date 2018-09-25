(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .directive('stViolationFilter', stViolationFilter);

    stViolationFilter.$inject = [];

    function stViolationFilter() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            scope: {
                filterType: '@'
            },
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {

            // Bind click event to input checkbox for selecting rank.
            element.bind('click', function() {

                var query = {
                    matchAny: {}
                };

                query.matchAny.items = getSelectedOptions();

                var numberOfItems = query.matchAny.items.length;
                if (numberOfItems === 0) {
                    query.matchAny.all = true;
                } else {
                    query.matchAny.all = false;
                }

                scope.$apply(function() {

                    if (isChangedRankType(scope.filterType)) {
                        retrieveTableState();
                    }

                    table.search(query, scope.filterType);

                    saveTableState();
                });
            });

            // Get selected options.
            function getSelectedOptions() {
                var selectedOptions = [];
                var allCategoryCheckBox = element.closest('.filter-body').find('input.' + scope.filterType + '-option');

                angular.forEach(allCategoryCheckBox, function(item) {
                    var theCheckbox = angular.element(item)[0];
                    if (theCheckbox.checked) {
                        selectedOptions.push(theCheckbox.value);
                    }
                });

                return selectedOptions;
            }

            // Save table state when rank type is changed.
            function saveTableState() {
                localStorage.setItem('savedViolationTable', JSON.stringify(table.tableState()));
            }

            // Retrieve table state.
            function retrieveTableState() {
                var savedState = JSON.parse(localStorage.getItem('savedViolationTable'));
                var tableState = table.tableState();

                angular.extend(tableState, savedState);
                table.pipe();
            }

            // Check if filterType is changed.
            function isChangedRankType(currentFilterType) {
                var savedRankType = localStorage.getItem('filterType');
                if(savedRankType == currentFilterType) {
                    return false;
                } else {
                    localStorage.setItem('filterType', currentFilterType);
                    return true;
                }
            }

            // Reset all localStorage variables when the directive is destroyed.
            scope.$on('$destroy', function() {
                localStorage.setItem('savedViolationTable', JSON.stringify({}));
                localStorage.setItem('filterType', '');
            });
        }
    }

})(angular);