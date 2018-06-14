(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('pagesKeywordsFilterController', pagesKeywordsFilterController)

    pagesKeywordsFilterController.$inject = ['$scope', '$timeout'];

    function pagesKeywordsFilterController($scope, $timeout) {
        /* jshint validthis:true */
        var vm = this;
        vm.categoriesForFilter = [];
        vm.activePageRanking = [];

        activate();

        //////////////

        function activate() {
            vm.categoriesForFilter = [{
                    name: 'Assigned Keywords',
                    value: 'assign',
                    option: 'keyword_assign',
                    categorySelected: true
                },
                {
                    name: 'Not Assigned Keywords',
                    value: 'not-assign',
                    option: 'keyword_assign',
                    categorySelected: false
                },
                {
                    name: 'System Assigned',
                    value: 'system',
                    option: 'assign_by',
                    categorySelected: false
                },
                {
                    name: 'Manually Assigned',
                    value: 'manual',
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
        $scope.$on('resetPageKeywordFilter', function(e) {

            initCategoryFilter();

            _.each(vm.activePageRanking, function(value, key) {
                vm.activePageRanking[key].rankSelected = false;
                vm.activePageRanking[key].significanceSelected = false;
                vm.activePageRanking[key].suitabilitySelected = false;
            });
        });

        // Init Filter for category.
        function initCategoryFilter() {
            _.each(vm.categoriesForFilter, function(value, key) {
                vm.categoriesForFilter[key].categorySelected = false;
            });
        }

        // Init filter with assigned keywords.
        $scope.$on('setupFilterForAssignedKeywords', function(e) {

            vm.showPageKeywordFilterPane = true;

            initCategoryFilter();

            $timeout(function() {
                var el = document.querySelector('#pages_expand_filter .filter-category .mda-list-item:first-child input.category-option');
                angular.element(el).click();
                vm.showPageKeywordFilterPane = false;
            }, 500);
        });
    }

})(angular);