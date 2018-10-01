(function () {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteSettingsController', websiteSettingsController)

    websiteSettingsController.$inject = ['$scope', '$timeout', '$state', 'commonService'];

    function websiteSettingsController($scope, $timeout, $state, commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.maximumKeywordByPage = '5';
        vm.appliedDefaultKeywords = true;

        activate();

        //////////////

        function activate() {
            vm.activePageRanking = [{
                    name: 'Excellent',
                    value: '4',
                    bg: 'bg-green-300',
                    significanceSelected: true,
                    suitabilitySelected: true
                },
                {
                    name: 'Good',
                    value: '3',
                    bg: 'bg-green-500',
                    significanceSelected: true,
                    suitabilitySelected: true
                },
                {
                    name: 'Suitable',
                    value: '2',
                    bg: 'bg-yellow-700',
                    significanceSelected: true,
                    suitabilitySelected: true
                },
                {
                    name: 'Poor',
                    value: '1',
                    bg: 'bg-red-500',
                    significanceSelected: false,
                    suitabilitySelected: true
                }
            ];
            getOwnSites(1);
        }

        // Get user's own site names.
        function getOwnSites(userID) {
            commonService
                .getUserSites(userID)
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                    getKeywords(vm.selectedSite.id);
                    getLanguages(vm.selectedSite.id);
                });
        }
    }

})();