(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesManageController', pagesManageController)

    pagesManageController.$inject = [
        '$rootScope', '$scope', '$window', '$stateParams', '$timeout',
        'Notify', 'filterFilter', 'commonService', 'websitesService', 'keywordsService', 'convertPagesManageDataFilter', 'convertPageDataFilter'];

    function pagesManageController(
        $rootScope, $scope, $window, $stateParams, $timeout,
        Notify, filterFilter, commonService, websitesService, keywordsService, convertPagesManageDataFilter, convertPageDataFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.allRowsMarked = false;
        vm.bulkActions = [];
        vm.copyToClipboard = copyToClipboard
        vm.currentPage = 1;
        vm.filterOn = false;
        vm.itemsByPage = [];
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
        vm.getLanguages = getLanguages;
        vm.expandPageDetail = expandPageDetail
        vm.selectedLanguage = {};
        vm.languages = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
            vm.bulkActions = [{
                    label: 'Remove from System',
                    icon: 'fa-trash-o'
                },
                {
                    label: 'Refresh, Process',
                    icon: 'fa-refresh'
                },
                {
                    label: 'Auto Optimise Page',
                    icon: 'fa-toggle-on'
                },
                {
                    label: 'Generate Title/Description',
                    icon: 'fa-toggle-on'
                },
                {
                    label: 'Export CSV',
                    icon: 'fa-list'
                }
            ];
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

                    // Set value for number of row by page in dropdown.
                    vm.itemsByPage =  [
                        { label: '5', value: '5' },
                        { label: '10', value: '10' },
                        { label: '15', value: '15' },
                        { label: '20', value: '20' },
                        { label: 'All', value: vm.pagesList.length.toString()}
                    ];
                    vm.numberOfRows = vm.itemsByPage[1].value;
                });
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
            var selectedRows = filterFilter($scope.filteredCollection, {selected: true});
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
            _($scope.filteredCollection).forEach(function (value, index) {
                if (current === true) {
                    $scope.filteredCollection[index].selected = true;
                } else {
                    $scope.filteredCollection[index].selected = false;
                }
            });
        });

        // Set filter on/off switch status.
        $scope.$watch('filteredCollection', function() {
            if ($scope.filteredCollection != undefined) {
                var original = vm.pagesList.length;
                var filtered = $scope.filteredCollection.length;
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
        function expandPageDetail(row) {
            _.each(vm.pagesList, function(value, key) {
                if (row != value) {
                    vm.pagesList[key].expanded = false;
                }
            });
            row.expanded = !row.expanded;
            vm.savedExpandedRowId = row.id;
            getKeywordDetail(row);
        }

        // Get selected keyword's detail information.
        function getKeywordDetail(row) {
            var keywordID = row.id;
            keywordsService
                .getKeywords(keywordID)
                .then(function (response) {
                    vm.keywordDetailCollection = convertPageDataFilter(response.data);
                    // Set value for number of row by page in dropdown.
                    vm.detailItemsByPage =  [
                        { label: '5', value: '5' },
                        { label: '10', value: '10' },
                        { label: '15', value: '15' },
                        { label: '20', value: '20' },
                        { label: 'All', value: vm.keywordDetailCollection.length.toString()}
                    ];
                    vm.detailNumberOfRows = vm.detailItemsByPage[1].value;

                    vm.pageCategoryPane = true;
                });
        }

        // Gey available languages.
        function getLanguages(siteId) {
            websitesService
                .getLanguages(siteId)
                .then(function (response) {
                    vm.languages = response.data;
                    vm.selectedLanguage = vm.languages[1];
                });
        }
    }

})();