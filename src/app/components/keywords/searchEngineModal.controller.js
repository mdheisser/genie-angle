 /**=========================================================
 * Controller: searchEngineModal.controller.js
 * @desc Search Engine SERP Monitoring Modal controller
 =========================================================*/

(function () {
    'use strict';

    keywordsApp.controller("searchEngineModalCtrl", searchEngineModalCtrl);
    searchEngineModalCtrl.$inject = ['$scope', 'websitesService', '$timeout'];    

    function searchEngineModalCtrl ($scope, websitesService, $timeout) {
        var vm = this;
        vm.sites = [];
        vm.site = {};
        vm.seViews = [];
        vm.searchEngines = [];
        vm.getDomains = getDomains;
        vm.selectDomain = selectDomain;

        activate();

        //////////////////////

        function activate () {
            init();
        }

        // initialize the controller
        function init () {
            vm.sites = [
                { id: 1, name: 'www.umm.com' },
                { id: 2, name: 'www.uee.com' }
            ];
            vm.site.selected = vm.sites[0];
            vm.searchEngines = [
                { name: 'Google', domains: [], icon: 'socicon-google' },
                { name: 'Yahoo', domains: [], icon: 'socicon-yahoo' },
                { name: 'Bing', domains: [], icon: 'socicon-bing' },
                { name: 'Yandex', domains: [], icon: 'socicon-yandex' }
            ];
            vm.seViews = [
                {
                    index: 0,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    domainSelected: false,
                    domainChecking: false
                }, {
                    index: 1,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    domainSelected: false,
                    domainChecking: false
                },
                {
                    index: 2,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    domainSelected: false,
                    domainChecking: false
                }
            ];
        }

        function getDomains ($item) {
            switch ($item.engines.selected) {
                case 'Google':
                    websitesService.getGoogleDomains().then(function (response) {
                        $item.domains = response.data;
                    });
                    break;
                case 'Yahoo':
                    websitesService.getYahooDomains().then(function (response) {
                        $item.domains = response.data;
                    });
                    break;
                case 'Bing':
                    websitesService.getBingDomains().then(function (response) {
                        $item.domains = response.data;
                    });
                    break;
                case 'Yandex':
                    websitesService.getYandexDomains().then(function (response) {
                        $item.domains = response.data;
                    });
                    break;
            };
        }

        function selectDomain (item) {
            item.domainChecking = true;
            item.domainSelected = false;
            $timeout(function () {
                item.domainChecking = false;
                item.domainSelected = true;
            }, 1000);
        }
    }

})();