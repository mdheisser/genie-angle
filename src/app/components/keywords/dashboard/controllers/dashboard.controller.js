(function () {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keyDashController', keyDashController)

    keyDashController.$inject = ['$scope', '$timeout', '$location', 'commonService', 'websitesService'];

    function keyDashController($scope, $timeout, $location, commonService, websitesService) {
        /* jshint validthis:true */
        var vm = this;

        vm.changeDomains = changeDomains;
        vm.chartOptions = null;
        vm.domains = [];
        vm.filterDays = [];
        vm.getDomains = getDomains;
        vm.reportDate = '1. 22.2018';
        vm.searchEngines = [];
        vm.selectDomain = selectDomain;
        vm.selectedSite = {}
        vm.seViews = [];
        vm.sites = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
            drawCharts();
            getFilerDays();
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

        // Get user's own site names.
        function getOwnSites() {
            commonService
                .getSites()
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                });
        }

        function getFilerDays() {
            var data = [{
                    id: 1,
                    name: '360'
                },
                {
                    id: 2,
                    name: '180'
                },
                {
                    id: 3,
                    name: '90'
                },
                {
                    id: 4,
                    name: '30'
                }
            ];
            vm.filterDays = data;
            vm.selectedDay = data[0];
        }

        function drawCharts() {

            var chartHeight = 400;

            var chartOptions = {
                chart: {
                    height: chartHeight
                },
                title: {
                    text: 'Agreegated SERP Ranking For All Keywords',
                    style: {
                        fontSize: '15px'
                    }
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                series: [{
                    name: 'Google',
                    data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
                    zones: [{
                        color: '#DB3236'
                    }],
                    color: '#DB3236'
                }, {
                    name: 'Yahoo',
                    data: [39, 75, 16, 19, 174, 16, 235, 178, 276, 294, 195, 154],
                    zones: [{
                        color: '#410093'
                    }],
                    color: '#410093'
                }]
            };

            vm.chartOptions = chartOptions;
        }

        // Detect the changing of the route.
        $scope.$on('$locationChangeStart', function(event) {
            setRoute();
        })

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/keywords-dashboard/statistics':
                    flashHit('#keywords_statistics');
                    break;
                case '/app/keywords-dashboard/engines':
                    flashHit('#keywords_search_engine');
                    break;
                case '/app/keywords-dashboard/ranking':
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
    }

})();