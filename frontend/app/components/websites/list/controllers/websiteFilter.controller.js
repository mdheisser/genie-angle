(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('websiteFilterController', websiteFilterController)

    websiteFilterController.$inject = ['$scope'];

    function websiteFilterController($scope) {
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
    }

})(angular);