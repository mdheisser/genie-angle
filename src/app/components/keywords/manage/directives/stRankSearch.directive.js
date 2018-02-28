(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('stRankSearch', stRankSearch);

    stRankSearch.$inject = [];

    function stRankSearch() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            scope: {
                rankType: '@'
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

                    if (isChangedRankType(scope.rankType)) {
                        retrieveTableState();
                    }

                    table.search(query, scope.rankType);

                    saveTableState();
                });
            });

            // Get selected options.
            function getSelectedOptions() {
                var selectedOptions = [];
                var allCategoryCheckBox = element.closest('.filter-ranking').find('input.' + scope.rankType + '-option');

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
                localStorage.setItem('savedTable', JSON.stringify(table.tableState()));
            }

            // Retrieve table state.
            function retrieveTableState() {
                var savedState = JSON.parse(localStorage.getItem('savedTable'));
                var tableState = table.tableState();

                angular.extend(tableState, savedState);
                table.pipe();
            }

            // Check if rankType is changed.
            function isChangedRankType(currentRankType) {
                var savedRankType = localStorage.getItem('rankType');
                if(savedRankType == currentRankType) {
                    return false;
                } else {
                    localStorage.setItem('rankType', currentRankType);
                    return true;
                }
            }

            // Reset all localStorage variables when the directive is destroyed.
            scope.$on('$destroy', function() {
                localStorage.setItem('savedTable', JSON.stringify({}));
                localStorage.setItem('rankType', '');
            });
        }
    }

})(angular);