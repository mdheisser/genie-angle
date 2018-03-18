(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordsListController', keywordsListController)

    keywordsListController.$inject = [
        '$scope', '$timeout', '$resource', '$q', '$mdDialog', '$window',
        '$location', 'keywordsService', 'Notify', 'filterFilter', 'convertTableDataFilter'
    ];

    function keywordsListController(
        $scope, $timeout, $resource, $q, $mdDialog, $window,
        $location, keywordsService, Notify, filterFilter, convertTableDataFilter) {
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
        vm.onActivePromotedKeyword = onActivePromotedKeyword;
        vm.popupOpen = {};
        vm.performAction = performAction;
        vm.rowCollection = [];
        vm.site = {};
        vm.selectedSite = {};
        vm.sites = [];
        vm.textCopyState = 'Copy Keyword';

        vm.detailCurrentPage = 1;
        vm.detailFilterOn = false;
        vm.detailAllRowsMarked = false;
        vm.expandKeywordDetail = expandKeywordDetail;
        vm.filterDays = [];
        vm.keywordDetailCollection = [];
        vm.onSelectKeywordDetail = onSelectKeywordDetail;
        vm.onSearchWithKeyword = onSearchWithKeyword;
        vm.reportDate = '1. 22.2018';
        vm.savedExpandedRowId = null;

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

            getOwnSites();
            drawCharts();
        }

        // Get user's own site names.
        function getOwnSites() {
            keywordsService
                .getSites()
                .then(function (response) {
                    vm.sites = response.data;
                    vm.selectedSite = vm.sites[0];
                    getKeywords(vm.selectedSite.id);
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

        // Reset Fitler.
        $scope.$watch(function() {
            return vm.filterOn;
        }, function(newValue, oldValue) {
            if (newValue === false) {
                $scope.$broadcast('resetFilter');
            }
        });

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
                var original = vm.rowCollection.length;
                var filtered = $scope.filteredCollection.length;
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
        function copyToClipboard(text, el) {
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
        }

        // Active/Deactive promoted keyword.
        function onActivePromotedKeyword(row) {

            var keywordID = row.id;

            if (row.category.promoted === true) {
                keywordsService
                    .activePromotedKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            getKeywords(vm.selectedSite.id);
                        }
                    });
            } else {
                keywordsService
                    .deactivePromotedKeyword(keywordID)
                    .then(function (response) {
                        if (response.data.response === true) {
                            getKeywords(vm.selectedSite.id);
                        }
                    });
            }
        }

        /////////////////////////  DETAIL EXPANSION  /////////////////////////////////////////////////////////////////////////////////////////////////////

        // Expand Keyword Detail Page
        function expandKeywordDetail(row) {
            _.each(vm.rowCollection, function(value, key) {
                vm.rowCollection[key].expanded = false;
            });
            row.expanded = true;
            vm.savedExpandedRowId = row.id;
            getKeywordDetail(row);
        }

        // Get selected keyword's detail information.
        function getKeywordDetail(row) {
            var keywordID = row.id;
            keywordsService
                .getKeywordDetail(keywordID)
                .then(function (response) {
                    vm.keywordDetailCollection = response.data;
                    // Set value for number of row by page in dropdown.
                    vm.detailItemsByPage =  [
                        { label: '5', value: '5' },
                        { label: '10', value: '10' },
                        { label: '15', value: '15' },
                        { label: '20', value: '20' },
                        { label: 'All', value: vm.keywordDetailCollection.length.toString()}
                    ];
                    vm.detailNumberOfRows = vm.detailItemsByPage[1].value;
                });
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
                    .title('Remove Keyword from this Page?')
                    .content('')
                    .cancel('NO')
                    .ok('YES')
                    .targetEvent(ev);

                $mdDialog.show(confirm).then(function() {
                    console.log('yes');
                }, function() {
                    console.log('no');
                });
            } else {
                var confirm = $mdDialog.confirm()
                    .title('Add the Keyword to this Page?')
                    .content('')
                    .cancel('NO')
                    .ok('YES')
                    .targetEvent(ev);

                $mdDialog.show(confirm).then(function() {
                    console.log('yes');
                }, function() {
                    console.log('no');
                });
            }
        }

        // Search selected keyword on new tab.
        function onSearchWithKeyword(keyword, event) {
            var url = '';
            if (('' + keyword).toLowerCase().indexOf('http') > -1) {
                url = keyword;
            } else {
                url = 'http://google.com/search?q=' + keyword;
            }
            $window.open(url, '_blank');
            event.stopPropagation();
        }

        // Reset Detail Expansion Fitler.
        $scope.$watch(function() {
            return vm.detailFilterOn;
        }, function(newValue, oldValue) {
            if (newValue === false) {
                $scope.$broadcast('resetFilter');
            }
        });

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
    }

})(angular);