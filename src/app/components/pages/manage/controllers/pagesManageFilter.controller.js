(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('pagesManageFilterController', pagesManageFilterController)

    pagesManageFilterController.$inject = ['$scope', 'filterFilter'];

    function pagesManageFilterController($scope, filterFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.activePageRanking = [];
        vm.categoriesForFilter = [];

        activate();

        //////////////

        function activate() {
            vm.assignedFilter = [{
                    name: 'Assigned Pages',
                    value: 'assign',
                    categorySelected: false
                },
                {
                    name: 'Not Assigned pages',
                    value: 'not-assign',
                    categorySelected: false
                }
            ];
            vm.promotedFilter = [{
                    name: 'Promoted pages',
                    value: 'promoted',
                    categorySelected: false
                },
                {
                    name: 'Not Promoted pages',
                    value: 'not-promoted',
                    categorySelected: false
                }
            ];
            vm.activePageRanking = [{
                    name: 'Excellent',
                    value: '1',
                    bg: 'bg-green-300',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Good',
                    value: '2',
                    bg: 'bg-green-500',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Suitable',
                    value: '3',
                    bg: 'bg-yellow-700',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Poor',
                    value: '4',
                    bg: 'bg-red-500',
                    rankSelected: false,
                    significanceSelected: false,
                    suitabilitySelected: false
                }
            ];
        }

        // Reset Filter selection.
        $scope.$on('resetPagesFilter', function(e) {
            vm.assignedFilter[0].categorySelected = false;
            vm.assignedFilter[1].categorySelected = false;

            vm.promotedFilter[0].categorySelected = false;
            vm.promotedFilter[1].categorySelected = false;

            _.each(vm.activePageRanking, function(value, key) {
                vm.activePageRanking[key].rankSelected = false;
                vm.activePageRanking[key].significanceSelected = false;
                vm.activePageRanking[key].suitabilitySelected = false;
            });
        });
    }

})(angular);