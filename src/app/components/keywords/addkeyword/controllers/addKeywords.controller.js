(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller("addKeywordsCtrl", addKeywordsCtrl);
    addKeywordsCtrl.$inject = ['$scope', 'commonService'];

    function addKeywordsCtrl($scope, commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.selectedSite = {};
        vm.sites = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
        }

        // Get user's own site names.
        function getOwnSites() {
            commonService
                .getSites()
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                });
        }
    }

})(angular);