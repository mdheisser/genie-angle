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
            scope: {},
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            // Bind click event to input checkbox for selecting category.
            element.bind('click', function() {

                var query = getSelectedOptions();

                // Check if all values is false.
                var result = _.every(_.values(query), function(v) {
                    return !v;
                });

                if(result) {
                    query = '';
                }

                table.search(query, 'category');
            });

            // Get selected categories.
            function getSelectedOptions() {
                var selectedOptions = {};
                var allCategoryCheckBox = element.closest('.filter-body').find('input.category-option');

                angular.forEach(allCategoryCheckBox, function(item) {
                    var theCheckbox = angular.element(item)[0];
                    if (theCheckbox.checked) {
                        selectedOptions[theCheckbox.value] = true;
                    }
                });

                return selectedOptions;
            }
        }
    }

})(angular);