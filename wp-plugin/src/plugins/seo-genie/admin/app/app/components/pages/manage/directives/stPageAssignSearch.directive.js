(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .directive('stPagesAssignSearch', stPagesAssignSearch);

    stPagesAssignSearch.$inject = ['$rootScope'];

    function stPagesAssignSearch($rootScope) {
        var directive = {
            restrict: 'EA',
            require: '^stTable',
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

                    table.search(query, 'assign');

                });
            });

            // Get selected options.
            function getSelectedOptions() {
                var selectedOptions = [];
                var allCategoryCheckBox = element.closest('.filter-body').find('input.assigned-option');

                angular.forEach(allCategoryCheckBox, function(item) {
                    var theCheckbox = angular.element(item)[0];
                    if (theCheckbox.checked) {
                        selectedOptions.push(theCheckbox.value);
                    }
                });

                return selectedOptions;
            }

            // Initialize filter, by defalut assigned pages is displayed.
            // scope.isLoaded = false;
            // $rootScope.pageTableInit = 0;

            // scope.$watch(table.getFilteredCollection, function(val){
            //     scope.isLoaded = true;
            // });

            // scope.$watch('isLoaded', function() {
            //     if ($rootScope.pageTableInit == 0) {

            //         var query = {
            //             matchAny: {}
            //         };

            //         query.matchAny.items = ['assign'];

            //         table.search(query, 'assign');
            //     }

            //     $rootScope.pageTableInit++;
            // })
        }
    }

})(angular);