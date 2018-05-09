(function () {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordPageViolationController', keywordPageViolationController)

    keywordPageViolationController.$inject = [
        '$scope', '$mdDialog',
        'pagesService', 'pageData'];

    function keywordPageViolationController(
        $scope, $mdDialog,
        pagesService, pageData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.pageData = {};
        vm.currentPage = 1;

        activate();

        //////////////

        function activate() {
            vm.pageData = pageData;
            // Set value for number of row by page in dropdown.
            vm.itemsByPage =  [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: 'All', value: '9999'}
            ];

            vm.numberOfRows = vm.itemsByPage[1];
            getViolationData();
        }

        // Gey violation status for page
        function getViolationData() {
            pagesService
                .getPageViolation(1)
                .then(function (response) {
                    vm.pageViolationCollection = response.data;
                });
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

    }

})();