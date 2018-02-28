(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('stCategorySearch', stCategorySearch);

    stCategorySearch.$inject = [];

    function stCategorySearch() {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
            scope: {
                category: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            // Bind click event to input checkbox for selecting category.
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

                table.search(query, 'category');
            });

            // Get selected categories.
            function getSelectedOptions() {
                var selectedOptions = [];
                var allCategoryCheckBox = element.closest('.filter-category').find('input');

                angular.forEach(allCategoryCheckBox, function(item) {
                    var theCheckbox = angular.element(item)[0];
                    if (theCheckbox.checked) {
                        selectedOptions.push(theCheckbox.value)
                    }
                });

                return selectedOptions;
            }
        }
    }

})(angular);