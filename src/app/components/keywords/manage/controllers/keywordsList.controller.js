(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordsListController', keywordsListController)

    keywordsListController.$inject = [
        '$rootScope', '$scope', '$timeout', '$resource', '$q', '$mdDialog', '$window', '$localStorage',
        '$location', 'commonService', 'keywordsService', 'websitesService', 'Notify', 'filterFilter', 'convertTableDataFilter', 'convertPageDataFilter'
    ];

    function keywordsListController(
        $rootScope, $scope, $timeout, $resource, $q, $mdDialog, $window, $localStorage,
        $location, commonService, keywordsService, websitesService, Notify, filterFilter, convertTableDataFilter, convertPageDataFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.allRowsMarked = false;
        vm.bulkActions = [];
        vm.currentPage = 1;
        vm.copyToClipboard = copyToClipboard;
        vm.filterCondition = '1';
        vm.filterOn = false;
        vm.keywords = [];
        vm.minForcedPromotion = 1;
        vm.maxForcedPromotion = 3;
        vm.onActiveDefaultKeyword = onActiveDefaultKeyword;
        vm.onActiveForcedKeyword = onActiveForcedKeyword;
        vm.onActivePromotedKeyword = onActivePromotedKeyword;
        vm.onActiveMonitoredKeyword = onActiveMonitoredKeyword;
        vm.openKeywordActionPane = openKeywordActionPane;
        vm.popupOpen = {};
        vm.performAction = performAction;
        vm.refreshKeyword = refreshKeyword;
        vm.resetFilter = resetFilter;
        vm.rowCollection = [];
        vm.site = {};
        vm.selectedSite = {};
        vm.sites = [];
        vm.textCopyState = 'Copy Keyword';

        vm.chartOptions = {};
        vm.detailCurrentPage = 1;
        vm.detailFilterOn = false;
        vm.detailAllRowsMarked = false;
        vm.expandKeywordDetail = expandKeywordDetail;
        vm.keywordCategories = [];
        vm.keywordCategoryGroup = keywordCategoryGroup;
        vm.languages = [];
        vm.onSelectKeywordDetail = onSelectKeywordDetail;
        vm.onSearchWithKeyword = onSearchWithKeyword;
        vm.openPageUrl = openPageUrl;
        vm.removeKeyword = removeKeyword;
        vm.savedExpandedRowId = null;
        vm.selectedKeywordCategory = null;
        vm.setManualPromotion = setManualPromotion;

        activate();

        //////////////

        function activate() {
            vm.bulkActions = [{
                    label: 'Remove from System',
                    icon: 'fa-trash-o'
                },
                {
                    label: 'Refresh, Process',
                    icon: 'fa-refresh'
                },
                {
                    label: 'Mark for Monitoring',
                    icon: 'fa-line-chart'
                },
                {
                    label: 'Mark for Promotion',
                    icon: 'fa-toggle-on'
                },
                {
                    label: 'Force Promotion',
                    icon: 'fa-bookmark-o',
                    class: 'force-promotion'
                },
                {
                    label: 'Default Keyword',
                    icon: 'fa-anchor'
                },
                {
                    label: 'Export CSV',
                    icon: 'fa-list'
                }
            ];

            vm.keywordCategories = [
                { name: 'CreativeWork', group: 'Creative works' },
                { name: 'Book', group: 'Creative works' },
                { name: 'Movie', group: 'Creative works' },
                { name: 'MusicRecording', group: 'Creative works' },
                { name: 'Recipe', group: 'Creative works' },
                { name: 'TVSeries', group: 'Creative works' },
                { name: 'AudioObject', group: 'Embedded non-text objects' },
                { name: 'ImageObject', group: 'Embedded non-text objects' },
                { name: 'VideoObject', group: 'Embedded non-text objects' },
                { name: 'Event', group: '' },
                { name: 'Organization', group: '' },
                { name: 'Person', group: '' },
                { name: 'Place', group: '' },
                { name: 'LocalBusiness', group: '' },
                { name: 'Restaurant', group: '' },
                { name: 'Product', group: '' },
                { name: 'Offer', group: '' },
                { name: 'AggregateOffer', group: '' },
                { name: 'Review', group: '' },
                { name: 'AggregateRating', group: '' }
            ];

            // Set dropdown options for pagination.
            var dropdownOptions =  [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: 'All', value: '9999'}
            ];

            vm.itemsByPage = dropdownOptions;
            vm.numberOfRows = dropdownOptions[1];
            vm.detailItemsByPage =  dropdownOptions;
            vm.detailNumberOfRows = dropdownOptions[1];

            getOwnSites();
            getLanguages();
        }

        // Get user's own site names.
        function getOwnSites() {
            commonService
                .getSites()
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                    getKeywords(vm.selectedSite.id);
                    getLanguages(vm.selectedSite.id);
                });
        }

        function getKeywords(siteId) {
            keywordsService
                .getKeywords(siteId)
                .then(function (response) {
                    vm.rowCollection = convertTableDataFilter(response.data);

                    if(vm.savedExpandedRowId != null) {
                        vm.rowCollection[vm.savedExpandedRowId - 1].expanded = true;
                    }

                    setRoute();
                });
        }

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/keywords-manage/best':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForBestKeywords'); 
                    break;
                case '/app/keywords-manage/least':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForLeastKeywords');
                    break;
                case '/app/keywords-manage/default':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForDefaultKeywords');
                    break;
            }
        }

        // Gey available languages.
        function getLanguages(siteId) {
            websitesService
                .getLanguages(siteId)
                .then(function (response) {
                    vm.languages = response.data;
                });
        }

        // Perform bulk action
        function performAction(name) {
            var selectedRows = filterFilter($scope.keywordManage, {selected: true});
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

        // Refresh, process selected keyword
        function refreshKeyword(row, event) {
            row.showActions = false;
            var msgHtml = 'Refresh the keyword' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );

            event.stopPropagation();
        }

        // Reset Keyword Fitler.
        function resetFilter() {
            if (vm.filterOn === true) {
                $scope.$broadcast('resetFilter');
            }
        }

        // Mark/Unmark all rows
        $scope.$watch(function () {
            return vm.allRowsMarked;
        }, function (current, original) {
            _($scope.keywordManage).forEach(function (value, index) {
                if (current === true) {
                    $scope.keywordManage[index].selected = true;
                } else {
                    $scope.keywordManage[index].selected = false;
                }
            });
        });

        // Set filter on/off switch status.
        $scope.$watch('keywordManage', function() {
            if ($scope.keywordManage != undefined) {
                var original = vm.rowCollection.length;
                var filtered = $scope.keywordManage.length;
                if(original != filtered) {
                    vm.filterOn = true;
                } else {
                    vm.filterOn = false;
                }
            }
        });

        // Get the keywords when the selected site is changed.
        $scope.$watch(function() {
            return vm.selectedSite;
        }, function() {
            getKeywords(vm.selectedSite.id);
        });

        // Save keyword to clipbaord
        function copyToClipboard(row, el) {
            var text = row.keyword;
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

        // Active/Deactive default keyword.
        function onActiveDefaultKeyword(row) {

            var keywordID = row.id;

            if (row.category.default === true) {
                keywordsService
                    .activeDefaultKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            row.category.default = false;
                        }
                    });
            } else {
                keywordsService
                    .deactiveDefaultKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            row.category.default = true;
                        }
                    });
            }
        }

        // Active/Deactive default keyword.
        function onActiveForcedKeyword(row) {

            var keywordID = row.id;

            if (row.category.forced === true) {
                keywordsService
                    .activeForcedKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            row.category.forced = false;
                            row.forced_min = 1;
                            row.forced_max = 1;
                        }
                    });
            } else {
                keywordsService
                    .deactiveForcedKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            row.category.forced = true;
                        }
                    });
            }
        }

        // Active/Deactive promoted keyword.
        function onActivePromotedKeyword(row) {

            var keywordID = row.id;

            if (row.category.promoted === true) {
                keywordsService
                    .activePromotedKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            row.category.monitored = true;
                        }
                    });
            } else {
                keywordsService
                    .deactivePromotedKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            // getKeywords(vm.selectedSite.id);
                        }
                    });
            }
        }

        // Active/Deactive promoted keyword.
        function onActiveMonitoredKeyword(row, event) {

            var keywordID = row.id;

            if (row.category.promoted === false) {
                if (row.category.monitored === true) {
                    keywordsService
                        .activeMonitoredKeyword(keywordID)
                        .then(function (response) {
                            if (response.data.response === true) {
                                row.category.monitored = false;
                            }
                        });
                } else {
                    keywordsService
                        .deactiveMonitoredKeyword(keywordID)
                        .then(function (response) {
                            if (response.data.response === true) {
                                row.category.monitored = true;
                            }
                        });
                }
            }

            expandKeywordDetail(row);
            var data = {};
            data.keywordSetting = true;
            data.keywordCategories = true;
            data.keywordPerformance = true;
            data.keywordRankingChart = false;
            data.keywordAssignedPages = true;
            $localStorage['panelState'] = angular.toJson(data);
            console.log(data);

            event.stopPropagation();
        }

        // Open Actions Pane for a specific keyword
        function openKeywordActionPane(row, event) {
            _.each(vm.rowCollection, function(value, key) {
                if (row != value) {
                    vm.rowCollection[key].showActions = false;
                }
            });
            row.showActions = !row.showActions;

            event.stopPropagation();
        }

        /////////////////////////  DETAIL EXPANSION  /////////////////////////////////////////////////////////////////////////////////////////////////////

        // Expand Keyword Detail Page
        function expandKeywordDetail(row) {
            _.each(vm.rowCollection, function(value, key) {
                if (row != value) {
                    vm.rowCollection[key].expanded = false;
                }
            });
            row.expanded = !row.expanded;
            if (row.expanded == true) {
                var data = {};
                data.keywordSetting = false;
                data.keywordCategories = false;
                data.keywordPerformance = false;
                data.keywordRankingChart = false;
                data.keywordAssignedPages = false;
                $localStorage['panelState'] = angular.toJson(data);
            }
            vm.savedExpandedRowId = row.id;
        }

        // Group for keyword category
        function keywordCategoryGroup(item) {
            if (item.group === 'Creative works')
                return 'Creative works';

            if (item.group === 'Embedded non-text objects')
                return 'Embedded non-text objects';

            if (item.group === '')
                return 'Other';
        }


        function drawCharts() {
            //
        }

        // Mark/Unmark all rows
        $scope.$watch(function () {
            return vm.detailAllRowsMarked;
        }, function (current, original) {
            _(vm.keywordDetailCollection).forEach(function (value, index) {
                if (current === true) {
                    vm.keywordDetailCollection[index].selected = true;
                } else {
                    vm.keywordDetailCollection[index].selected = false;
                }
            });
        });

        // Select/Deselect a page to be assigned keyword with confirmation dialog.
        function onSelectKeywordDetail(detail, ev) {
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

        // Search selected keyword on new tab.
        function onSearchWithKeyword(row, event) {
            var keyword = row.keyword;
            var url = '';
            if (('' + keyword).toLowerCase().indexOf('http') > -1) {
                url = keyword;
            } else {
                url = 'http://google.com/search?q=' + keyword;
            }
            $window.open(url, '_blank');

            row.showActions = false;
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

        // Remove selected keyword from system
        function removeKeyword(row, ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to remove this Keyword from the system?')
                .content('')
                .cancel('NO')
                .ok('YES')
                .targetEvent(ev);

            $mdDialog.show(confirm).then(function() {
                row.showActions = false;
                var msgHtml = 'Removed the keyword from System' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
                Notify.alert(
                    msgHtml,
                    {status: 'success', pos: 'top-center'}
                );
            }, function() {
                console.log('no');
            });

            ev.stopPropagation();
        }

        // Set the promotion for selected keyword manually
        function setManualPromotion(detail, event) {
            // var element = angular.element(event.target);
            // var label = element.closest('label')
            // var manual_promotion = detail.manual_promotion;

            // if (detail.category.promoted === false) {
            //     if(manual_promotion === false) {
            //         label.find('md-switch .md-thumb').css('background-color', 'rgb(78, 83, 195)');
            //         // To Do implement with api
            //         detail.manual_promotion = true;
            //     } else {
            //         label.find('md-switch .md-thumb').css('background-color', '#FFF');
            //         // To Do implement with api
            //         detail.manual_promotion = false;
            //     }
            // }

            event.stopPropagation();
        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if (toState.name == 'app.keywords-manage.default') {
                vm.showAdditionalFilter = true;
                $scope.$broadcast('setupFilterForDefaultKeywords');
            }
        })
    }

})(angular);