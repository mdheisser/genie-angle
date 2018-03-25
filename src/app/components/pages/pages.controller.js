(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .controller("pagesController", pagesController);
    pagesController.$inject = ['$scope', '$location'];

    function pagesController($scope, $location) {
        var vm = this;
        vm.activeTab = 1;

        activate();

        ///////////////////////

        function activate() {
            setRoute();
        }

        // Detect the changing of the route.
        $scope.$on('$locationChangeStart', function(event) {
            setRoute();
        })

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/pages/dashboard':
                    vm.activeTab = 1;
                    break;
                case '/app/pages/manage':
                    vm.activeTab = 2;
                    break;
                default:
                    vm.activeTab = 1;
            }
        }
    }

})(angular);