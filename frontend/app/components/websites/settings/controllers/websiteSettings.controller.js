(function () {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteSettingsController', websiteSettingsController)

    websiteSettingsController.$inject = ['$scope', '$timeout', '$state'];

    function websiteSettingsController($scope, $timeout, $state) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        //////////////

        function activate() {
            vm.activePageRanking = [{
                    name: 'Excellent',
                    value: '4',
                    bg: 'bg-green-300',
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Good',
                    value: '3',
                    bg: 'bg-green-500',
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Suitable',
                    value: '2',
                    bg: 'bg-yellow-700',
                    significanceSelected: false,
                    suitabilitySelected: false
                },
                {
                    name: 'Poor',
                    value: '1',
                    bg: 'bg-red-500',
                    significanceSelected: false,
                    suitabilitySelected: false
                }
            ];
        }
    }

})();