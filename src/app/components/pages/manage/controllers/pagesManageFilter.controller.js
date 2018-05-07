(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesManageFilterController', pagesManageFilterController)

    pagesManageFilterController.$inject = ['$scope', '$timeout','filterFilter'];

    function pagesManageFilterController($scope, $timeout, filterFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.activePageRanking = [];
        vm.categoriesForFilter = [];
        vm.pageCategoryPane = false;

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
                    icon: 'fa-check text-success',
                    rankSelected: false,
                    seoSelected: false,
                },
                {
                    name: 'Good',
                    value: '2',
                    bg: 'bg-green-500',
                    icon: 'fa-warning text-primary',
                    rankSelected: false,
                    seoSelected: false,
                },
                {
                    name: 'Suitable',
                    value: '3',
                    bg: 'bg-yellow-700',
                    icon: 'fa-warning text-warning',
                    rankSelected: false,
                    seoSelected: false,
                },
                {
                    name: 'Poor',
                    value: '4',
                    bg: 'bg-red-500',
                    icon: 'fa-info-circle text-danger',
                    rankSelected: false,
                    seoSelected: false,
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
                vm.activePageRanking[key].seoSelected = false;
            });
        });

        // Init filter with best performance ranking
        $scope.$on('setupFilterForBestPages', function(e) {
            vm.pageCategoryPane = true;
            $timeout(function() {
                if (vm.activePageRanking[3].rankSelected == true) {
                    var el = document.querySelector('#pages_manage_filter .filter-ranking tr:last-child input.ranking-option');
                    angular.element(el).click();
                }
                var el = document.querySelector('#pages_manage_filter .filter-ranking input.ranking-option:first-child');
                angular.element(el).click();
                vm.pageCategoryPane = false;
            }, 500);
        })

        // Init filter with least performance ranking
        $scope.$on('setupFilterForLeastPages', function(e) {
            vm.pageCategoryPane = true;
            $timeout(function() {
                if (vm.activePageRanking[0].rankSelected == true) {
                    var el = document.querySelector('#pages_manage_filter .filter-ranking input.ranking-option:first-child');
                    angular.element(el).click();
                }
                var el = document.querySelector('#pages_manage_filter .filter-ranking tr:last-child input.ranking-option');
                angular.element(el).click();
                vm.pageCategoryPane = false;
            }, 500);
        })
    }

})(angular);