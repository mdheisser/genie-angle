(function () {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteDashController', websiteDashController)

    websiteDashController.$inject = ['$scope', '$timeout', '$state', 'websitesService'];

    function websiteDashController($scope, $timeout, $state, websitesService) {
        /* jshint validthis:true */
        var vm = this;

        vm.changeDomains = changeDomains;
        vm.domains = [];
        vm.getDomains = getDomains;
        vm.goManagePage = goManagePage;
        vm.searchEngines = [];
        vm.selectDomain = selectDomain;
        vm.seViews = [];

        activate();

        //////////////

        function activate() {
            init();
        }

        // initialize the controller
        function init() {

            vm.searchEngines = [{
                    name: 'Google',
                    domains: [],
                    icon: 'socicon-google'
                },
                {
                    name: 'Yahoo',
                    domains: [],
                    icon: 'socicon-yahoo'
                },
                {
                    name: 'Bing',
                    domains: [],
                    icon: 'socicon-bing'
                },
                {
                    name: 'Yandex',
                    domains: [],
                    icon: 'socicon-yandex'
                }
            ];

            vm.seViews = [{
                    index: 0,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    selectedEngine: 'Google',
                    selectedDomain: '',
                    domainSelected: false,
                    domainChecking: false
                }, {
                    index: 1,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    selectedEngine: 'Yahoo',
                    domainSelected: false,
                    domainChecking: false
                },
                {
                    index: 2,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    selectedEngine: 'Bing',
                    domainSelected: false,
                    domainChecking: false
                }
            ];
            getDomains();
        }

        // Get social domains from web service.
        function getDomains () {
            websitesService.getGoogleDomains().then(function (response) {
                vm.domains.google = response.data;
                vm.seViews[0].domains = response.data;
                vm.seViews[0].selectedDomain = response.data[0];
            });
            websitesService.getYahooDomains().then(function (response) {
                vm.domains.yahoo = response.data;
                vm.seViews[1].domains = response.data;
                vm.seViews[1].selectedDomain = response.data[0];
            });
            websitesService.getBingDomains().then(function (response) {
                vm.domains.bing = response.data;
                vm.seViews[2].domains = response.data;
                vm.seViews[2].selectedDomain = response.data[0];
            });
            websitesService.getYandexDomains().then(function (response) {
                vm.domains.yandex = response.data;
            });
        }

        // Update subdomains by selecting the search engine.
        function changeDomains($item) {
            switch ($item.selectedEngine) {
                case 'Google':
                    $item.domains = vm.domains.google;
                    $item.selectedDomain = vm.domains.google[0];
                    break;
                case 'Yahoo':
                    $item.domains = vm.domains.yahoo;
                    $item.selectedDomain = vm.domains.yahoo[0];
                    break;
                case 'Bing':
                    $item.domains = vm.domains.bing;
                    $item.selectedDomain = vm.domains.bing[0];
                    break;
                case 'Yandex':
                    $item.domains = vm.domains.yandex;
                    $item.selectedDomain = vm.domains.yandex[0];
                    break;
            };
        }

        // Show check icon when a subdomain is selected.
        function selectDomain(item) {
            item.domainChecking = true;
            item.domainSelected = false;
            $timeout(function () {
                item.domainChecking = false;
                item.domainSelected = true;
            }, 1000);
        }

        // Go to Keywords Manage page with filter
        function goManagePage(filter) {
            if (filter == 'best') {
                $state.go('app.websites-manage.best');
            } else if(filter == 'least') {
                $state.go('app.websites-manage.least');
            }
        }
    }

})();