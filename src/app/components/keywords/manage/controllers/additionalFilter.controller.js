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
                    bg: 'bg-red-500',
                    selected: false
                },
                {
                    name: 'Good',
                    value: '3',
                    bg: 'bg-yellow-700',
                    selected: false
                },
                {
                    name: 'Suitable',
                    value: '2',
                    bg: 'bg-green-500',
                    selected: false
                },
                {
                    name: 'Poor',
                    value: '1',
                    bg: 'bg-green-300',
                    selected: false
                }
            ];
        }

        // Bind to parent controller's method
        $scope.$on('getSelectedCategories', function(e) {
            $scope.$emit("callBack", returnCategorySelection());
        });

        // Return selected categories.
        function returnCategorySelection() {
            return filterFilter(vm.categoriesForFilter, {selected: true});
        }
    }

})(angular);