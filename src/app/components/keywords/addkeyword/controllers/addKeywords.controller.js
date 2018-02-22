(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller("addKeywordsCtrl", addKeywordsCtrl);
    addKeywordsCtrl.$inject = ['$scope'];

    function addKeywordsCtrl($scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.site = {};
        vm.site.selected = undefined;
        vm.sites = [];
        vm.keywords = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
        }

        // Get user's own site names.
        function getOwnSites() {
            var data = [
                { id: 1, name: 'www.umm.com' },
                { id: 2, name: 'www.uee.com' }
            ];
            vm.sites = data;
            vm.site.selected = data[0].name;
        }
    }

})(angular);