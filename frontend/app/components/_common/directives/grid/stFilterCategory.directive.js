(function (angular) {
    'use strict';

    angular
        .module('components.directives')
        .directive('stFilterCategory', stFilterCategory);

    stFilterCategory.$inject = [];

    function stFilterCategory() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            scope: {
                filterBy: '='
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

                    table.search(query, scope.filterBy);

                });
            });

            // Get selected options.
            function getSelectedOptions() {
                var selectedOptions = [];
                var allCategoryCheckBox = element.closest('.filter-body').find('input.category-option');

                angular.forEach(allCategoryCheckBox, function(item) {
                    var theCheckbox = angular.element(item)[0];
                    if (theCheckbox.checked) {
                        selectedOptions.push(theCheckbox.value);
                    }
                });

                return selectedOptions;
            }
        }
    }

})(angular);