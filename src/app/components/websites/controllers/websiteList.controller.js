(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteListController', websiteListController)

    websiteListController.$inject = ['commonService'];

    function websiteListController(commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.currentPage = 1;

        activate();

        //////////////

        function activate() {
            // Set dropdown options for pagination.
            var dropdownOptions =  [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: 'All', value: '9999'}
            ];

            vm.itemsByPage = dropdownOptions;
            vm.numberOfRows = dropdownOptions[1];
            // Get sites information
            commonService
                .getUserSites('1')
                .then(function(resp) {
                    vm.rowCollection = resp.data;
                });
        }

    }

})(angular);