(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesManageController', pagesManageController)

    pagesManageController.$inject = [
        '$rootScope', '$scope', '$window', '$stateParams', '$timeout', '$mdDialog', '$localStorage', '$location',
        'Notify', 'filterFilter', 'commonService', 'websitesService', 'keywordsService', 'pagesService', 'convertPagesManageDataFilter', 'convertPageDataFilter', 'convertPageKeywordsFilter'];

    function pagesManageController(
        $rootScope, $scope, $window, $stateParams, $timeout, $mdDialog, $localStorage, $location,
        Notify, filterFilter, commonService, websitesService, keywordsService, pagesService, convertPagesManageDataFilter, convertPageDataFilter, convertPageKeywordsFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.allRowsMarked = false;
        vm.copyToClipboard = copyToClipboard
        vm.currentPage = 1;
        vm.exportManageTable = exportManageTable;
        vm.filterOn = false;
        vm.onAutoOptimisePage = onAutoOptimisePage
        vm.onExportCSV = onExportCSV
        vm.onGenerateTitle = onGenerateTitle
        vm.onRefreshPage = onRefreshPage
        vm.onRemoveFromSystem = onRemoveFromSystem
        vm.openPageActions = openPageActions
        vm.openPageUrl = openPageUrl
        vm.pagesList = [];
        vm.performBulkAction = performBulkAction
        vm.resetPagesFilter = resetPagesFilter;
        vm.selectedSite = {};
        vm.showAdditionalFilter = false;
        vm.sites = [];

        vm.detailCurrentPage = 1;
        vm.violationCurrentPage = 1;
        vm.getLanguages = getLanguages;
        vm.expandFilterOn = false;
        vm.expandPageDetail = expandPageDetail
        vm.pagesExpandCollection = [];
        vm.pageViolationCollection = [];
        vm.selectedLanguage = [];
        vm.languages = [];
        vm.resetViolationFilter = resetViolationFilter;
        vm.resetPageKeywordFilter = resetPageKeywordFilter;
        vm.onPageKeywordAction = onPageKeywordAction;
        vm.expandViolationGrid = expandViolationGrid;
        vm.expandKeywordsGrid = expandKeywordsGrid;
        vm.showKeywordChart = showKeywordChart;
        vm.showKeywordSetting = showKeywordSetting;

        activate();

        //////////////

        function activate() {
            getOwnSites();

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
            vm.itemsByPageForPageGrid = dropdownOptions;
            vm.numberOfRowsForPageGrid = dropdownOptions[1];
        }

        // Save keyword to clipbaord
        function copyToClipboard(row, el) {
            var text = row.pageUrl;
            var copyTest = document.queryCommandSupported('copy');

            if (copyTest === true) {
                var copyTextArea = document.createElement("textarea");
                copyTextArea.value = text;
                document.body.appendChild(copyTextArea);
                copyTextArea.select();
                try {
                    var successful = document.execCommand('copy');
                    vm.textCopyState = successful ? 'Copied!' : 'Whoops, not copied!';

                    // Initialize tooltip text when element lose mouse.
                    var element = angular.element(el.target);
                    element.bind('mouseleave', function() {
                        vm.textCopyState = 'Copy Keyword';
                    });
                } catch (err) {
                    console.log('Oops, unable to copy');
                }
                document.body.removeChild(copyTextArea);
            } else {
                // Fallback if browser doesn't support .execCommand('copy')
                window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
            }

            row.showActions = false;

            var msgHtml = 'Copied the keyword to clipboard!';

            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );

            el.stopPropagation();
        }

        // Export table to Excel file 
        function exportManageTable() {
            // TO Do : export excel
            Notify.alert(
                'Table exported to excel file.',
                {status: 'success', pos: 'top-center'}
            );
        }

        // Get the user's sites from server.
        function getOwnSites() {
            var userId = '11111'; // To Do: Replace it with the authenticated user's id.
            commonService
                .getSites(userId)
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                    getPages(vm.selectedSite.id);
                    getLanguages(vm.selectedSite.id);
                });
        }

        // Get pages for User's Site
        function getPages(siteId) {
            commonService
                .getPages('1')
                .then(function (response) {
                    vm.pagesList = convertPagesManageDataFilter(response.data);

                    setRoute();
                });
        }

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/pages-manage/best':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForBestPages');
                    break;
                case '/app/pages-manage/least':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForLeastPages');
                    break;
            }
        }

        // Active auto optimise page
        function onAutoOptimisePage(page) {
            page.showActions = false;
            var msgHtml = 'Page auto optimized.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }

        // Export CSV for page
        function onExportCSV(page) {
            page.showActions = false;
            var msgHtml = 'Exported CSV file.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }

        // Generate the title/description for page
        function onGenerateTitle(page) {
            page.showActions = false;
            var msgHtml = 'Generated the title/description.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }

        // Refresh, process page from system
        function onRefreshPage(page) {
            page.showActions = false;
            var msgHtml = 'Refreshed page.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }

        // Remove page from system
        function onRemoveFromSystem(page) {
            page.showActions = false;
            var msgHtml = 'Removed page from system.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }

        // Open Actions Pane for a specific page
        function openPageActions(row, event) {
            _.each(vm.pagesList, function(value, key) {
                if (row != value) {
                    vm.pagesList[key].showActions = false;
                }
            });
            row.showActions = !row.showActions;

            event.stopPropagation();
        }

        // Search selected keyword on new tab.
        function openPageUrl(row, event) {
            var url = row.pageUrl;
            $window.open(url, '_blank');

            row.showActions = false;
            row.showKeywordsPopup = false;
            event.stopPropagation();
        }

        // Perform bulk action
        function performBulkAction(name) {
            var selectedRows = filterFilter($scope.pageManage, {selected: true});
            var msgHtml = '';

            if(selectedRows.length <= 0) {
                msgHtml = 'Nothing selected!'
            } else {
                msgHtml = selectedRows.length + ' Records: ' + name + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            }

            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-right'}
            );
        }

        // Reset Pages Fitler.
        function resetPagesFilter() {
            if (vm.filterOn === true) {
                $scope.$broadcast('resetPagesFilter');
            }
        }

        // Mark/Unmark all rows
        $scope.$watch(function () {
            return vm.allRowsMarked;
        }, function (current, original) {
            _($scope.pageManage).forEach(function (value, index) {
                if (current === true) {
                    $scope.pageManage[index].selected = true;
                } else {
                    $scope.pageManage[index].selected = false;
                }
            });
        });

        // Set filter on/off switch status.
        $scope.$watch('pageManage', function() {
            if ($scope.pageManage != undefined) {
                var original = vm.pagesList.length;
                var filtered = $scope.pageManage.length;
                if(original != filtered) {
                    vm.filterOn = true;
                } else {
                    vm.filterOn = false;
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if (fromState.name == 'app.pages-dashboard' && toState.name == 'app.pages-manage' && toParams.filter != null) {
                vm.showAdditionalFilter = true;
                if (toParams.filter == 'best') {
                    $scope.$broadcast('initBestPagesManageFilter');
                } else if (toParams.filter == 'least') {
                    $scope.$broadcast('initLeastPagesManageFilter');
                }
            }
        })

        /////////////////////////  DETAIL EXPANSION  /////////////////////////////////////////////////////////////////////////////////////////////////////

        // Expand Keyword Detail Page
        function expandPageDetail(row, state) {
            _.each(vm.pagesList, function(value, key) {
                if (row != value) {
                    vm.pagesList[key].expanded = false;
                }
            });
            row.expanded = !row.expanded;
            if (row.expanded == true) {
                var data = {};
                data.page_description = false;
                data.page_setting = false;
                data.pages_assign_key = false;
                data.pages_violation = false;
                $localStorage['panelState'] = angular.toJson(data);
            }
            vm.savedExpandedRowId = row.id;
            getKeywordDetail(row);
            getViolationData();
        }

        // Get selected keyword's detail information.
        function getKeywordDetail(row) {
            var keywordID = row.id;
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

        // Expand violation grid
        function expandViolationGrid(row, event) {
            expandPageDetail(row);
            var data = {};
            data.page_description = true;
            data.page_setting = true;
            data.pages_assign_key = true;
            data.pages_violation = false;
            $localStorage['panelState'] = angular.toJson(data);
            event.stopPropagation();
        }

        // Expand keywords grid
        function expandKeywordsGrid(row, event) {
            expandPageDetail(row);
            var data = {};
            data.page_description = true;
            data.page_setting = true;
            data.pages_assign_key = false;
            data.pages_violation = true;
            $localStorage['panelState'] = angular.toJson(data);
            event.stopPropagation();
        }

        // Gey violation status for page
        function getViolationData() {
            pagesService
                .getPageViolation(1)
                .then(function (response) {
                    vm.pageViolationCollection = response.data;
                });
        }

        // Gey available languages.
        function getLanguages(siteId) {
            websitesService
                .getLanguages(siteId)
                .then(function (response) {
                    vm.languages = response.data;
                    vm.selectedLanguage.push(vm.languages[1]);
                });
        }

        // Reset Page Fitler.
        function resetPageKeywordFilter() {
            if (vm.expandFilterOn === true) {
                $scope.$broadcast('resetPageKeywordFilter');
            }
        }

        // Set detail filter on/off switch status.
        $scope.$watch(function() {
            return localStorage.getItem('detailFilteredCollection');
        }, function() {
            var detailFilteredCollection = JSON.parse(localStorage.getItem('detailFilteredCollection'));
            if (detailFilteredCollection != undefined) {
                var original = vm.pagesExpandCollection.length;
                var filtered = detailFilteredCollection.length;
                if(original != filtered) {
                    vm.expandFilterOn = true;
                } else {
                    vm.expandFilterOn = false;
                }
            }
        });

        // Reset Violation Fitler.
        function resetViolationFilter() {
            if (vm.violationFilterOn === true) {
                $scope.$broadcast('resetViolationFilter');
            }
        }

        // Set detail filter on/off switch status.
        $scope.$watch(function() {
            return localStorage.getItem('filteredViolations');
        }, function() {
            var filteredViolations = JSON.parse(localStorage.getItem('filteredViolations'));
            if (filteredViolations != undefined) {
                var original = vm.pageViolationCollection.length;
                var filtered = filteredViolations.length;
                if(original != filtered) {
                    vm.violationFilterOn = true;
                } else {
                    vm.violationFilterOn = false;
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
    }

})();