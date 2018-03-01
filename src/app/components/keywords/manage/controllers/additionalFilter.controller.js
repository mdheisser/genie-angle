(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('additionalFilterController', additionalFilterController)

    additionalFilterController.$inject = ['$scope', 'filterFilter'];

    function additionalFilterController($scope, filterFilter) {
        /* jshint validthis:true */
        var vm = this;
        vm.categoriesForFilter = [];
        vm.activePageRanking = [];

        activate();

        //////////////

        function activate() {
            init();
        }

        // Initialize controller
        function init() {
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

        // Bind to parent controller's method
        $scope.$on('getFilterState', function(e) {
            $scope.$emit("callBack", returnCategorySelection());
        });

        // Return filter applied state.
        function returnCategorySelection() {
            var isSelectedCategory = filterFilter(vm.categoriesForFilter, {selected: true}).length > 0;
            var isSelectedRank = filterFilter(vm.activePageRanking, {rankSelected: true}).length > 0;
            var isSelectedSignificance = filterFilter(vm.activePageRanking, {significanceSelected: true}).length > 0;
            var isSelectedSuitability = filterFilter(vm.activePageRanking, {suitabilitySelected: true}).length > 0;

            if(isSelectedCategory || isSelectedRank || isSelectedSignificance || isSelectedSuitability) {
                return true;
            }
            return false;
        }
    }

})(angular);