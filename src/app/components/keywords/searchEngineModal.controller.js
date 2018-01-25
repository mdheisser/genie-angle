 /**=========================================================
 * Controller: searchEngineModal.controller.js
 * @desc Search Engine SERP Monitoring Modal controller
 =========================================================*/

(function () {
    'use strict';

    keywordsApp.controller("searchEngineModalCtrl", searchEngineModalCtrl);
    searchEngineModalCtrl.$inject = ['$scope', 'websitesService'];    

    function searchEngineModalCtrl ($scope, websitesService) {
        var vm = this;
        vm.sites = [];
        vm.site = {};
        vm.seViews = [];
        vm.searchEngines = [];
        vm.getDomains = getDomains;

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
                    engine: vm.searchEngines[0],
                    engines: angular.copy(vm.searchEngines)
                }, {
                    index: 1,
                    engine: vm.searchEngines[1],
                    engines: angular.copy(vm.searchEngines)
                },
                {
                    index: 2,
                    engine: vm.searchEngines[2],
                    engines: angular.copy(vm.searchEngines)
                }
            ];
        }

        function getDomains ($item, $model) {
            switch ($item.name) {
                case 'Google':
                    websitesService.getGoogleDomains().then(function (response) {
                        $item.domains = response.data;
                        $item.domains.selected = vm.searchEngines[0].domains[0];
                    });
                    break;
                case 'Yahoo':
                    websitesService.getYahooDomains().then(function (response) {
                        $item.domains = response.data;
                        $item.domains.selected = vm.searchEngines[1].domains[0];
                    });
                    break;
                case 'Bing':
                    websitesService.getBingDomains().then(function (response) {
                        $item.domains = response.data;
                        $item.domains.selected = vm.searchEngines[2].domains[0];
                    });
                    break;
                case 'Yandex':
                    websitesService.getYandexDomains().then(function (response) {
                        $item.domains = response.data;
                        $item.domains.selected = vm.searchEngines[3].domains[0];
                    });
                    break;
            };
        }
    }

})();