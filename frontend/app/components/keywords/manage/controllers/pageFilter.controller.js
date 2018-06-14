(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('pageFilterController', pageFilterController)

    pageFilterController.$inject = ['$scope', '$timeout'];

    function pageFilterController($scope, $timeout) {
        /* jshint validthis:true */
        var vm = this;
        vm.categoriesForFilter = [];
        vm.activePageRanking = [];

        activate();

        //////////////

        function activate() {
            vm.categoriesForFilter = [{
                    name: 'Assigned Pages',
                    value: 'assign',
                    option: 'page_assign',
                    categorySelected: false
                },
                {
                    name: 'Not Assigned Pages',
                    value: 'not-assign',
                    option: 'page_assign',
                    categorySelected: false
                },
                {
                    name: 'System Assigned',
                    value: 'system',
                    option: 'assign_by',
                    categorySelected: false
                }
            ];
            vm.activePageRanking = [{
                    name: 'Excellent',
                    value: '4',
                    bg: 'bg-green-300',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Good',
                    value: '3',
                    bg: 'bg-green-500',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Suitable',
                    value: '2',
                    bg: 'bg-yellow-700',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Poor',
                    value: '1',
                    bg: 'bg-red-500',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                }
            ];
        }

        // Reset Filter selection.
        $scope.$on('resetPageFilter', function(e) {
            initCategoryFilter();

            _.each(vm.activePageRanking, function(value, key) {
                vm.activePageRanking[key].rankSelected = false;
                vm.activePageRanking[key].significanceSelected = false;
                vm.activePageRanking[key].suitabilitySelected = false;
            });
        });

        // Init filter options for category
        function initCategoryFilter() {
            _.each(vm.categoriesForFilter, function(value, key) {
                vm.activePageRanking[key].categorySelected = false;
            });
        };

        // Init filter with assigned page.
        $scope.$on('setupFilterForAssignedPages', function(e) {

            vm.pageCategoryPane = true;

            initCategoryFilter();

            $timeout(function() {
                var el = document.querySelector('#keyword_page .filter-category .mda-list-item:first-child input.category-option');
                angular.element(el).click();
                vm.pageCategoryPane = false;
            }, 500);
        });
    }

})(angular);