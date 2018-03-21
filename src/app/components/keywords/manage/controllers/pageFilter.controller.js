(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('pageFilterController', pageFilterController)

    pageFilterController.$inject = ['$scope', 'filterFilter'];

    function pageFilterController($scope, filterFilter) {
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
                    categorySelected: true
                },
                {
                    name: 'Not Assigned pages',
                    value: 'not-assign',
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
        $scope.$on('resetFilter', function(e) {
            vm.categoriesForFilter[0].categorySelected = false;
            vm.categoriesForFilter[1].categorySelected = false;

            _.each(vm.activePageRanking, function(value, key) {
                vm.activePageRanking[key].rankSelected = false;
                vm.activePageRanking[key].significanceSelected = false;
                vm.activePageRanking[key].suitabilitySelected = false;
            });
        });
    }

})(angular);