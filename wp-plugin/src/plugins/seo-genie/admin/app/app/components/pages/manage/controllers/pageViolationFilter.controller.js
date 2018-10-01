(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .controller('pageViolationFilterController', pageViolationFilterController)

    pageViolationFilterController.$inject = ['$scope'];

    function pageViolationFilterController($scope) {
        /* jshint validthis:true */
        var vm = this;

        vm.categories = [];
        vm.showFilterPane = false;
        vm.violations = [];

        activate();

        //////////////

        function activate() {
            vm.categories = [{
                    name: 'Performance',
                    value: 'Performance',
                    selected: false
                },
                {
                    name: 'SEO',
                    value: 'SEO',
                    selected: false
                },
                {
                    name: 'Content',
                    value: 'Content',
                    selected: false
                }
            ];
            vm.violations = [{
                    value: '1',
                    icon: 'fa-info-circle text-danger',
                    selected: false,
                },
                {
                    value: '2',
                    icon: 'fa-warning text-warning',
                    selected: false,
                },
                {
                    value: '3',
                    icon: 'fa-warning text-primary',
                    selected: false,
                },
                {
                    value: '4',
                    icon: 'fa-check text-success',
                    selected: false,
                }
            ];
        }

        // Reset Filter selection.
        $scope.$on('resetViolationFilter', function(e) {
            _.each(vm.categories, function(value, key) {
                vm.categories[key].selected = false;
            });

            _.each(vm.violations, function(value, key) {
                vm.violations[key].selected = false;
            });
        });
    }

})(angular);