(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteFilterController', websiteFilterController)

    websiteFilterController.$inject = ['$scope', '$timeout'];

    function websiteFilterController($scope, $timeout) {
        /* jshint validthis:true */
        var vm = this;

        vm.rankFilters = [];
        vm.categoriesForFilter = [];

        activate();

        //////////////

        function activate() {
            vm.categoriesForFilter = [{
                    name: 'Active Sites',
                    value: 'active',
                    option: 'websiteActive',
                    selected: false
                },
                {
                    name: 'Non Active Sites',
                    value: 'deactive',
                    option: 'websiteActive',
                    selected: false
                }
            ];

            vm.rankFilters = [{
                    name: 'Good',
                    value: 3,
                    bg: 'bg-green-500',
                    rankSelected: false,
                    significanceSelected: false,
                },
                {
                    name: 'Suitable',
                    value: 2,
                    bg: 'bg-yellow-700',
                    rankSelected: false,
                    significanceSelected: false,
                },
                {
                    name: 'Poor',
                    value: 1,
                    bg: 'bg-red-500',
                    rankSelected: false,
                    significanceSelected: false,
                }
            ];
        }

        // Reset Filter selection.
        $scope.$on('resetWebsiteFilter', function(e) {

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
            _.each(vm.rankFilters, function(value, key) {
                vm.rankFilters[key].rankSelected = false;
                vm.rankFilters[key].significanceSelected = false;
            });
        }

         // Setup the filter with best performance websites
        $scope.$on('setupFilterForBestWebsites', function(e) {

            vm.categoryPane = true;

            initPerformanceFilter();

            $timeout(function() {
                var el = document.querySelector('#websites_manage_filter .filter-ranking input.health-option:first-child');
                angular.element(el).click();
                vm.categoryPane = false;
            }, 500);
        });

        // Setup the filter with least performance websites
        $scope.$on('setupFilterForLeastWebsites', function(e) {

            vm.categoryPane = true;

            initPerformanceFilter();

            $timeout(function() {
                var el = document.querySelector('#websites_manage_filter .filter-ranking tr:last-child input.health-option');
                angular.element(el).click();
                vm.categoryPane = false;
            }, 500);
        });
    }

})(angular);