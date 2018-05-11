(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller("addKeywordsCtrl", addKeywordsCtrl);
    addKeywordsCtrl.$inject = ['$scope', 'Notify', 'commonService'];

    function addKeywordsCtrl($scope, Notify, commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.selectedSite = {};
        vm.sites = [];
        vm.clearKeywords = clearKeywords;
        vm.addKeywords = addKeywords;

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

        // Clear Keywords
        function clearKeywords() {
            vm.keywords = '';
        }

        // Add Keywords
        function addKeywords() {
            var msgHtml = 'Added New Keywords <a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-right'}
            );
        }
    }

})(angular);