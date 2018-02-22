(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordsListController', keywordsListController)

    keywordsListController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'keywordsService'];

    function keywordsListController($scope, $timeout, $resource, $q, $location, keywordsService) {
        /* jshint validthis:true */
        var vm = this;
        vm.site = {};
        vm.site.selected = undefined;
        vm.sites = [];
        vm.keywords = [];
        vm.bulkActions = [];
        vm.filterCondition = '1';
        vm.allBulkActions = false;
        vm.bulkActionModel = [];
        vm.popupOpen = {};

        activate();

        //////////////

        function activate() {
            getOwnSites();
            getKeywords();
            init();
            $timeout(function() {
                vm.numberOfRows = '10';
            })
        }

        // Initialize controller
        function init() {
            vm.bulkActions = [
                { label: 'Remove Marked from System', icon: 'fa-trash-o'},
                { label: 'Refresh, Process Marked', icon: 'fa-refresh'},
                { label: 'Mark Keyword for Monitoring', icon: 'fa-line-chart'},
                { label: 'Mark Keyword for Promotion', icon: 'fa-toggle-on'},
                { label: 'Force Promotion of Marked Keyword ', icon: 'fa-bookmark-o'},
                { label: 'Mark as Default Keyword', icon: 'fa-anchor'}
            ];
            _(vm.bulkActions).forEach(function(value, index) {
                vm.bulkActionModel[index] = false;
            });
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

        // Get all keywords list.
        function getKeywords() {
            var data = [
                {keyword: 'Laurent', g: 12, y: 43, m: 102},
                {keyword: 'Blandine', g: 23, y: 5, m: 23},
                {keyword: 'Francoise', g: 34, y: 34, m: 423},
                {keyword: 'Laurent', g: 12, y: 43, m: 102},
                {keyword: 'Blandine', g: 23, y: 5, m: 23},
                {keyword: 'Francoise', g: 34, y: 34, m: 423},
                {keyword: 'Laurent', g: 12, y: 43, m: 102},
                {keyword: 'Blandine', g: 23, y: 5, m: 23},
                {keyword: 'Francoise', g: 34, y: 34, m: 423},
                {keyword: 'Laurent', g: 12, y: 43, m: 102},
                {keyword: 'Blandine', g: 23, y: 5, m: 23},
                {keyword: 'Francoise', g: 34, y: 34, m: 423},
                {keyword: 'Laurent', g: 12, y: 43, m: 102},
                {keyword: 'Blandine', g: 23, y: 5, m: 23},
                {keyword: 'Francoise', g: 34, y: 34, m: 423}
            ];
            vm.rowCollection = data;
        }

        // Select/Deselect All Bulk Actions
        $scope.$watch(function() {
            return vm.allBulkActions;
        }, function(current, original) {
            _(vm.bulkActionModel).forEach(function(value, index) {
                if(current === true) {
                    vm.bulkActionModel[index] = true;
                } else {
                    vm.bulkActionModel[index] = false;
                }
            });
        });
    }

})(angular);