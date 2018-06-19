(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteExpandController', websiteExpandController)

    websiteExpandController.$inject = ['$scope', '$mdDialog', '$timeout', 'websitesService', 'keywordsService', 'pagesService', 'convertPageKeywordsFilter'];

    function websiteExpandController($scope, $mdDialog, $timeout, websitesService, keywordsService, pagesService, convertPageKeywordsFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.pagesExpandCollection = [];
        vm.pageViolationCollection = [];
        vm.detailCurrentPage = 1;
        vm.violationCurrentPage = 1;
        vm.resetPageKeywordFilter = resetPageKeywordFilter;
        vm.onPageKeywordAction = onPageKeywordAction;
        vm.showKeywordChart = showKeywordChart;
        vm.showKeywordSetting = showKeywordSetting;
        vm.resetViolationFilter = resetViolationFilter;

        activate();

        //////////////

        function activate() {
            // Init dropdown options for grids.
            var dropdownOptions =  [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: 'All', value: '9999' }
            ];
            vm.itemsByPageForKeywordGrid = dropdownOptions;
            vm.numberOfRowsForKeywordGrid = dropdownOptions[1];
            vm.itemsByPageForViolationGrid = dropdownOptions;
            vm.numberOfRowsForViolationGrid = dropdownOptions[1];

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

            getKeywordDetail('1');
            getViolationData();
            getLanguages();
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

        // Get selected keyword's detail information.
        function getKeywordDetail(keywordID) {
            keywordsService
                .getKeywords(keywordID)
                .then(function (response) {
                    vm.pagesExpandCollection = convertPageKeywordsFilter(response.data);

                    vm.showExpandAdditionalFilter = true;
                    vm.showPageKeywordFilterPane = true;

                    // Set filter for assigned keywords.
                    $scope.$broadcast('setupFilterForAssignedKeywords');
                });
        }

        // Gey violation status for page
        function getViolationData() {
            pagesService
                .getPageViolation(1)
                .then(function (response) {
                    vm.pageViolationCollection = response.data;
                });
        }

        // Reset Page Fitler.
        function resetPageKeywordFilter() {
            if (vm.expandFilterOn === true) {
                $scope.$broadcast('resetPageKeywordFilter');
            }
        }

        // Set detail filter on/off switch status.
        $scope.$watch('pageKeyword', function() {
            if ($scope.pageKeyword != undefined) {
                var original = vm.pagesExpandCollection.length;
                var filtered = $scope.pageKeyword.length;
                if(original != filtered) {
                    vm.expandFilterOn = true;
                } else {
                    vm.expandFilterOn = false;
                }
            }
        });

        // Remove or Add keyword to page
        function onPageKeywordAction(detail, ev) {
            if(detail.assignedState === true) {
                var confirm = $mdDialog.confirm()
                    .title('UnAssign Keyword From This Page?')
                    .cancel('NO')
                    .ok('YES')
                    .targetEvent(ev);

                $mdDialog.show(confirm).then(function() {
                    var msgHtml = 'KeyWord UnAssigned from the Page' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
                    Notify.alert(
                        msgHtml,
                        {status: 'success', pos: 'bottom-center'}
                    );
                    detail.assignedState = false;
                }, function() {
                    console.log('no');
                });
            } else {
                var confirm = $mdDialog.confirm()
                    .title('Assign Keyword To This Page?')
                    .content('')
                    .cancel('NO')
                    .ok('YES')
                    .targetEvent(ev);

                $mdDialog.show(confirm).then(function() {
                    var msgHtml = 'KeyWord Assigned to the Page' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
                    Notify.alert(
                        msgHtml,
                        {status: 'success', pos: 'bottom-center'}
                    );
                    detail.assignedState = true;
                }, function() {
                    console.log('no');
                });
            }
        }

        // Show Keywords chart on popup
        function showKeywordChart(row, event) {
            $mdDialog.show({
                locals:{
                    keywordData: row
                },
                controller: 'pagesKeywordChartController',
                controllerAs: 'pkcc',
                templateUrl: 'app/components/pages/manage/templates/pagesKeywordChart.html',
                targetEvent: event,
            })
            .then(function(answer) {
                //
            }, function() {
                //
            });

            event.stopPropagation();
        }

        // Show Keywords Page on popup
        function showKeywordSetting(row, event) {
            $mdDialog.show({
                locals:{
                    keywordData: row
                },
                controller: 'pagesKeywordSettingController',
                controllerAs: 'pksc',
                templateUrl: 'app/components/pages/manage/templates/pagesKeywordSetting.html',
                targetEvent: event,
            })
            .then(function(answer) {
                //
            }, function() {
                //
            });

            event.stopPropagation();
        }

        // Reset Violation Fitler.
        function resetViolationFilter() {
            if (vm.violationFilterOn === true) {
                $scope.$broadcast('resetViolationFilter');
            }
        }

        // Set detail filter on/off switch status.
        $scope.$watch('pageViolation', function() {
            if ($scope.pageViolation != undefined) {
                var original = vm.pageViolationCollection.length;
                var filtered = $scope.pageViolation.length;
                if(original != filtered) {
                    vm.violationFilterOn = true;
                } else {
                    vm.violationFilterOn = false;
                }
            }
        });

        // Gey available languages.
        function getLanguages() {
            websitesService
                .getLanguages(1)
                .then(function (response) {
                    vm.languages = response.data;
                    vm.selectedLanguage.push(vm.languages[1]);
                });
        }
    }

})(angular);