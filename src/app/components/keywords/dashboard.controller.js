/**=========================================================
 * Module: dashboard.controller.js
 * keyword dashboard controller
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.keywords')
        .controller('dashboardController', dashboardController)

    dashboardController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', '$uibModal'];

    function dashboardController($scope, $timeout, $resource, $q, $location, $uibModal) {
        /* jshint validthis:true */
        var vm = this;
        vm.site = {};
        vm.site.selected = undefined;
        vm.sites = [];
        vm.analyzeKeywords = [];
        vm.openAddModal = openAddModal;

        activate();

        //////////////

        function activate () {
            getOwnSites();
            getKeywordStatistics();
        }

        function getOwnSites () {
            var data = [
                { id: 1, name: 'www.umm.com' },
                { id: 2, name: 'www.uee.com' }
            ];
            vm.sites = data;
        }

        function getKeywordStatistics () {
            var data = [
                { id: 1, name: 'Number of Active Keywords Being Promoted', value: 534 },
                { id: 2, name: 'Number of Active Keywords Being Monitored', value: 787 },
                { id: 3, name: 'Average number of Keywords assignd to a Page', value: 4 },
                { id: 4, name: 'Average Keywords Page Position', value: 4 },
                { id: 5, name: 'Best Performing Keyword', value: 87 },
                { id: 6, name: 'Least performing keywords', value: 47 }
            ];
            vm.analyzeKeywords = data;
        }

        function openAddModal () {
            // 
        }
    }

})();
