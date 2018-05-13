(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('additionalFilterController', additionalFilterController)

    additionalFilterController.$inject = ['$scope', '$timeout'];

    function additionalFilterController($scope, $timeout) {
        /* jshint validthis:true */
        var vm = this;

        vm.activePageRanking = [];
        vm.categoriesForFilter = [];

        activate();

        //////////////

        function activate() {
            vm.categoriesForFilter = [{
                    name: 'Default Keywords',
                    value: 'default',
                    icon: 'fa-anchor',
                    selected: false
                },
                {
                    name: 'Promoted Keywords',
                    value: 'promoted',
                    icon: 'fa-toggle-on',
                    selected: false
                },
                {
                    name: 'Monitored Keywords',
                    value: 'monitored',
                    icon: 'fa-line-chart',
                    selected: false
                },
                {
                    name: 'Forced Keywords',
                    value: 'forced',
                    icon: 'fa-bookmark-o',
                    selected: false
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
        $scope.$on('resetFilter', function(e) {

            initCategoryFilter();
            initPerformanceFilter();
            vm.categoryPane = false;
        });

        // Initialize category filter
        function initCategoryFilter() {
            _.each(vm.categoriesForFilter, function(value, key) {
                vm.categoriesForFilter[key].selected = false;
            });
        }

        // Initialize performance filter
        function initPerformanceFilter() {
            _.each(vm.activePageRanking, function(value, key) {
                vm.activePageRanking[key].rankSelected = false;
                vm.activePageRanking[key].significanceSelected = false;
                vm.activePageRanking[key].suitabilitySelected = false;
            });
        }

        // Setup the filter with best performance keywords
        $scope.$on('setupFilterForBestKeywords', function(e) {

            vm.categoryPane = true;

            initPerformanceFilter();

            $timeout(function() {
                var el = document.querySelector('#keywords_manage_filter .filter-ranking input.ranking-option:first-child');
                angular.element(el).click();
                vm.categoryPane = false;
            }, 500);
        });

        // Setup the filter with least performance keywords
        $scope.$on('setupFilterForLeastKeywords', function(e) {

            vm.categoryPane = true;

            initPerformanceFilter();

            $timeout(function() {
                var el = document.querySelector('#keywords_manage_filter .filter-ranking tr:last-child input.ranking-option');
                angular.element(el).click();
                vm.categoryPane = false;
            }, 500);
        });

        // Setup the filter with default keywords
        $scope.$on('setupFilterForDefaultKeywords', function(e) {

            vm.categoryPane = true;

            initCategoryFilter();

            $timeout(function() {
                var el = document.querySelector('#keywords_manage_filter .filter-category .mda-list-item:first-child input.category-option');
                angular.element(el).click();
                vm.categoryPane = false;
            }, 500);
        });
    }

})(angular);