(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('websiteFilterController', websiteFilterController)

    websiteFilterController.$inject = ['$scope', '$timeout'];

    function websiteFilterController($scope, $timeout) {
        /* jshint validthis:true */
        var vm = this;

        vm.activePageRanking = [];
        vm.categoriesForFilter = [];

        activate();

        //////////////

        function activate() {
            vm.categoriesForFilter = [{
                    name: 'Active Sites',
                    value: 'default',
                    selected: false
                },
                {
                    name: 'Non Active Sites',
                    value: 'promoted',
                    selected: false
                }
            ];

            vm.activePageRanking = [{
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
    }

})(angular);