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
                    value: '1',
                    icon: 'fa-anchor',
                    selected: false
                },
                {
                    name: 'Promoted Keywords',
                    value: '2',
                    icon: 'fa-toggle-on',
                    selected: false
                },
                {
                    name: 'Monitored Keywords',
                    value: '3',
                    icon: 'fa-line-chart',
                    selected: false
                },
                {
                    name: 'Forced Keywords',
                    value: '4',
                    icon: 'fa-bookmark-o',
                    selected: false
                }
            ];
            vm.activePageRanking = [{
                    name: 'Excellent',
                    value: '1',
                    bg: 'bg-red-500',
                    selected: false
                },
                {
                    name: 'Good',
                    value: '2',
                    bg: 'bg-yellow-700',
                    selected: false
                },
                {
                    name: 'Suitable',
                    value: '3',
                    bg: 'bg-green-500',
                    selected: false
                },
                {
                    name: 'Poor',
                    value: '4',
                    bg: 'bg-green-300',
                    selected: false
                }
            ];
        }

        // Return selected categories.
        function returnCategorySelection() {
            return filterFilter(vm.categoriesForFilter, {selected: true});
        }

        // Bind to parent controller's method
        $scope.$on('getSelectedCategories', function(e) {
            $scope.$emit("callBack", returnCategorySelection());
        });
    }

})(angular);