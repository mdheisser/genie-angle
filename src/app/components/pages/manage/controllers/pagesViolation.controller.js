(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesViolationController', pagesViolationController)

    pagesViolationController.$inject = [
        '$rootScope', '$scope', '$window', '$stateParams', '$timeout', '$mdDialog',
        'Notify', 'filterFilter', 'pagesService', 'pageData', 'keywordData'];

    function pagesViolationController(
        $rootScope, $scope, $window, $stateParams, $timeout, $mdDialog,
        Notify, filterFilter, pagesService, pageData, keywordData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.currentPage = 1;
        vm.hide = hide;
        vm.pageData = {};
        vm.pageViolationCollection = [];
        vm.resetFilter = resetFilter;
        vm.keywordData = {};

        activate();

        //////////////

        function activate() {
            vm.pageData = pageData;
            vm.keywordData = keywordData;
            getGridData();
        }

        // Gey violation status for page
        function getGridData() {
            pagesService
                .getPageViolation(1)
                .then(function (response) {
                    vm.pageViolationCollection = response.data;
                    // Set value for number of row by page in dropdown.
                    vm.itemsByPage =  [
                        { label: '5', value: '5' },
                        { label: '10', value: '10' },
                        { label: '15', value: '15' },
                        { label: '20', value: '20' },
                        { label: 'All', value: vm.pageViolationCollection.length.toString()}
                    ];
                    vm.numberOfRows = vm.itemsByPage[1].value;
                });
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

        // Reset Page Fitler.
        function resetFilter() {
            vm.searchInput = '';
        }

        // Set detail filter on/off switch status.
        $scope.$watch(function() {
            return localStorage.getItem('detailFilteredCollection');
        }, function() {
            var detailFilteredCollection = JSON.parse(localStorage.getItem('detailFilteredCollection'));
            if (detailFilteredCollection != undefined) {
                var original = vm.pageViolationCollection.length;
                var filtered = detailFilteredCollection.length;
                if(original != filtered) {
                    vm.filterOn = true;
                } else {
                    vm.filterOn = false;
                }
            }
        });

    }

})();