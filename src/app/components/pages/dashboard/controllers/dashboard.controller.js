(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesDashboardController', pagesDashboardController)

    pagesDashboardController.$inject = ['$scope', '$state', 'commonService'];

    function pagesDashboardController($scope, $state, commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.goManagePage = goManagePage
        vm.selectedSite = {};
        vm.sites = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
        }

        // Get the user's sites from server.
        function getOwnSites() {
            var userId = '11111'; // To Do: Replace it with the authenticated user's id.
            commonService
                .getSites(userId)
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                });
        }

        // Go to Pages Manage page with filter
        function goManagePage(filter) {
            if (filter == 'best') {
                $state.go('app.pages-manage.best');
            } else if(filter == 'least') {
                $state.go('app.pages-manage.least');
            }
        }
    }

})();