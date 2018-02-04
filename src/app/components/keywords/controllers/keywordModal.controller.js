(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller("keywordModalCtrl", keywordModalCtrl);
    keywordModalCtrl.$inject = ['$scope'];

    function keywordModalCtrl($scope) {
        var vm = this;
        vm.sites = [];
        vm.selectedSite = '';

        activate();

        //////////////////////

        function activate() {
            init();
        }

        function init() {
            vm.sites = [
                { id: 1, name: 'www.umm.com' },
                { id: 2, name: 'www.uee.com' }
            ];
            vm.selectedSite = vm.sites[0].name;
        }
    }

})(angular);