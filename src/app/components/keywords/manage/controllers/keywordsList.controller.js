(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordsListController', keywordsListController)

    keywordsListController.$inject = [
        '$scope', '$timeout', '$resource', '$q', '$mdDialog', '$window',
        '$location', 'commonService', 'keywordsService', 'websitesService', 'Notify', 'filterFilter', 'convertTableDataFilter', 'convertPageDataFilter'
    ];

    function keywordsListController(
        $scope, $timeout, $resource, $q, $mdDialog, $window,
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
        vm.maxForcedPromotion = 1;
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

        vm.detailCurrentPage = 1;
        vm.detailFilterOn = false;
        vm.detailAllRowsMarked = false;
        vm.resetPageFilter = resetPageFilter;
        vm.expandKeywordDetail = expandKeywordDetail;
        vm.filterDays = [];
        vm.keywordDetailCollection = [];
        vm.keywordCategories = [];
        vm.keywordCategoryGroup = keywordCategoryGroup;
        vm.languages = [];
        vm.onSelectKeywordDetail = onSelectKeywordDetail;
        vm.onSearchWithKeyword = onSearchWithKeyword;
        vm.openPageActionPane = openPageActionPane;
        vm.openPageKeywordPopup = openPageKeywordPopup;
        vm.openPageUrl = openPageUrl;
        vm.reportDate = '1. 22.2018';
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
            var data = [{
                    id: 0,
                    name: 'ALL'
                },
                {
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
            vm.selectedDay = data[1];

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

            getOwnSites();
            getLanguages();
            drawCharts();
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

                    // Set value for number of row by page in dropdown.
                    vm.itemsByPage =  [
                        { label: '5', value: '5' },
                        { label: '10', value: '10' },
                        { label: '15', value: '15' },
                        { label: '20', value: '20' },
                        { label: 'All', value: vm.rowCollection.length.toString()}
                    ];

                    vm.numberOfRows = vm.itemsByPage[1].value;
                });
        }

        // Gey available languages.
        function getLanguages(siteId) {
            websitesService
                .getLanguages(siteId)
                .then(function (response) {
                    vm.languages = response.data;
                });
        }

        function drawCharts() {

            var chartOptions = {
                chart: {
                    height: 300
                },
                title: {
                    text: ''
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
                    name: 'Yahoo.UK',
                    data: [39, 75, 16, 19, 174, 16, 235, 178, 276, 294, 195, 154],
                    zones: [{
                        color: '#410093'
                    }],
                    color: '#410093'
                }]
            };

            vm.chartOptions = chartOptions;
        }

        // Perform bulk action
        function performAction(name) {
            var selectedRows = filterFilter($scope.filteredKeyCollection, {selected: true});
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
            _($scope.filteredKeyCollection).forEach(function (value, index) {
                if (current === true) {
                    $scope.filteredKeyCollection[index].selected = true;
                } else {
                    $scope.filteredKeyCollection[index].selected = false;
                }
            });
        });

        // Set filter on/off switch status.
        $scope.$watch('filteredKeyCollection', function() {
            if ($scope.filteredKeyCollection != undefined) {
                var original = vm.rowCollection.length;
                var filtered = $scope.filteredKeyCollection.length;
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
            vm.savedExpandedRowId = row.id;
            getKeywordDetail(row);
        }

        // Get selected keyword's detail information.
        function getKeywordDetail(row) {
            var keywordID = row.id;
            keywordsService
                .getKeywordDetail(keywordID)
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

        // Group for keyword category
        function keywordCategoryGroup(item) {
            if (item.group === 'Creative works')
                return 'Creative works';

            if (item.group === 'Embedded non-text objects')
                return 'Embedded non-text objects';

            if (item.group === '')
                return 'Other';
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

        // Open action pane for page url
        function openPageActionPane(detail, event) {
            _.each(vm.keywordDetailCollection, function(value, key) {
                if (detail != value) {
                    vm.keywordDetailCollection[key].showActions = false;
                }
            });
            detail.showActions = !detail.showActions;

            event.stopPropagation();
        }

        // Open popup for assigned pages
        function openPageKeywordPopup(detail, event) {
            _.each(vm.keywordDetailCollection, function(value, key) {
                if (detail != value) {
                    vm.keywordDetailCollection[key].showKeywordsPopup = false;
                }
            });
            detail.showKeywordsPopup = !detail.showKeywordsPopup;

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

        // Reset Page Fitler.
        function resetPageFilter() {
            if (vm.detailFilterOn === true) {
                $scope.$broadcast('resetPageFilter');
            }
        }

        // Set detail filter on/off switch status.
        $scope.$watch(function() {
            return localStorage.getItem('detailFilteredCollection');
        }, function() {
            var detailFilteredCollection = JSON.parse(localStorage.getItem('detailFilteredCollection'));
            if (detailFilteredCollection != undefined) {
                var original = vm.keywordDetailCollection.length;
                var filtered = detailFilteredCollection.length;
                if(original != filtered) {
                    vm.detailFilterOn = true;
                } else {
                    vm.detailFilterOn = false;
                }
            }
        });

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
    }

})(angular);