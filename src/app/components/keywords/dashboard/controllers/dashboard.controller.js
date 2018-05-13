(function () {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keyDashController', keyDashController)

    keyDashController.$inject = ['$scope', '$timeout', '$location', '$state', '$localStorage', 'commonService', 'websitesService'];

    function keyDashController($scope, $timeout, $location, $state, $localStorage, commonService, websitesService) {
        /* jshint validthis:true */
        var vm = this;

        vm.changeDomains = changeDomains;
        vm.changeSite = changeSite;
        vm.chartOptions = {};
        vm.domains = [];
        vm.getDomains = getDomains;
        vm.goManagePage = goManagePage;
        vm.searchEngines = [];
        vm.selectDomain = selectDomain;
        vm.selectedSite = {}
        vm.seViews = [];
        vm.sites = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
            init();
            setRoute();
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
            initPanles();
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

        // Get user's own site names.
        function getOwnSites() {
            commonService
                .getSites()
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                    drawCharts();
                });
        }

        function drawCharts() {
            vm.chartOptions.title.text = '<p>Agreegated SERP Ranking For All Keywords</p><br><p>' + vm.selectedSite.name + '</p>';
        }

        // Refresh the infomation when the site is changed.
        function changeSite() {
            drawCharts();
        }

        // Detect the changing of the route.
        $scope.$on('$locationChangeStart', function(event) {
            setRoute();
        })

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/keywords-dashboard/statistics':
                    expandPanel('keywords_statistics');
                    changeIcon('keywords_statistics');
                    flashHit('#keywords_statistics');
                    break;
                case '/app/keywords-dashboard/engines':
                    expandPanel('keywords_search_engine');
                    changeIcon('keywords_search_engine');
                    flashHit('#keywords_search_engine');
                    break;
                case '/app/keywords-dashboard/ranking':
                    expandPanel('keywords_dash_chart');
                    changeIcon('keywords_dash_chart');
                    flashHit('#keywords_dash_chart');
                    break;
            }
        }

        // Add flash animation to panel.
        function flashHit(id) {
            if (id != '') {
                var panel = angular.element(document.querySelector(id));
                panel.addClass('flashit');
                $timeout(function() {
                    panel.removeClass('flashit');
                }, 1000);
            }
        }

        // Expand panel
        function expandPanel(id) {
            var query = '#' + id + ' .panel-wrapper';
            var panel = angular.element(document.querySelector(query));
            panel.addClass('in');
            panel.removeAttr('style');
        }

        // Change arrow icon
        function changeIcon(id) {
            var queryDown = '#' + id + ' .panel-heading em:nth-child(1)';
            var queryUp = '#' + id + ' .panel-heading em:nth-child(2)';
            var arrowDown = angular.element(document.querySelector(queryDown));
            var arrowUp = angular.element(document.querySelector(queryUp));
            arrowUp.removeClass('ng-hide');
            arrowDown.addClass('ng-hide');
        }

        // init panles as expaned
        function initPanles(id) {
            var data = {};
            data.keywords_statistics = false;
            data.keywords_search_engine = false;
            data.keywords_dash_chart = false;
            $localStorage['panelState'] = angular.toJson(data);
        }

        // Go to Keywords Manage page with filter
        function goManagePage(filter) {
            if (filter == 'best') {
                $state.go('app.keywords-manage.best');
            } else if(filter == 'least') {
                $state.go('app.keywords-manage.least');
            }
        }
    }

})();