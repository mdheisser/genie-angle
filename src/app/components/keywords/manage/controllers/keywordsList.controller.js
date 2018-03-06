(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordsListController', keywordsListController)

    keywordsListController.$inject = [
        '$scope', '$timeout', '$resource', '$q',
        '$location', 'keywordsService', 'Notify', 'filterFilter'
    ];

    function keywordsListController(
        $scope, $timeout, $resource, $q,
        $location, keywordsService, Notify, filterFilter) {
        /* jshint validthis:true */
        var vm = this;
        vm.site = {};
        vm.site.selected = undefined;
        vm.sites = [];
        vm.keywords = [];
        vm.bulkActions = [];
        vm.filterCondition = '1';
        vm.allRowsMarked = false;
        vm.selectedRows = [];
        vm.popupOpen = {};
        vm.performAction = performAction;
        vm.filterOn = false;
        vm.changeTablePage = changeTablePage;
        vm.currentPage = 1;
        vm.copyToClipboard = copyToClipboard;
        vm.textCopyState = 'Click to copy to clipboard';

        activate();

        //////////////

        function activate() {
            getOwnSites();
            getKeywords();
            init();
        }

        // Initialize controller
        function init() {
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
                    icon: 'fa-bookmark-o'
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
        }

        // Get user's own site names.
        function getOwnSites() {
            var data = [{
                    id: 1,
                    name: 'www.umm.com'
                },
                {
                    id: 2,
                    name: 'www.uee.com'
                }
            ];
            vm.sites = data;
            vm.site.selected = data[0].name;
        }

        function getKeywords() {
            //TODO: Replace by real side it from vm.site.selected.id
            var demoSiteID = 'sdfsdfsdfsdffsdf';
            keywordsService
                .getKeywords(demoSiteID)
                .then(function (response) {
                    vm.rowCollection = convertResponse(response.data);

                    // Set value for number of row by page in dropdown.
                    vm.itemsByPage =  [
                        { label: '5', value: '5' },
                        { label: '10', value: '10' },
                        { label: '15', value: '15' },
                        { label: '20', value: '20' },
                        { label: 'All', value: vm.rowCollection.length.toString()}
                    ];
                    vm.numberOfRows = vm.itemsByPage[1].value;

                    // Initialize selected state of rows.
                    _(vm.rowCollection).forEach(function (value, index) {
                        vm.selectedRows[index] = false;
                    });
                });
        }

        // Perform bulk action
        function performAction(name) {
            var selectedRows = filterFilter(vm.selectedRows, true);
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

        // Get fiter selection state.
        $scope.$broadcast('getFilterState');

        $scope.$on('callBack', function(e,data) {
            vm.filterOn = data;
        });

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
            _(vm.selectedRows).forEach(function (value, index) {
                if (current === true) {
                    vm.selectedRows[index] = true;
                } else {
                    vm.selectedRows[index] = false;
                }
            });
        });

        // Convert data to suitable structure.(add ranking option in accordance with google active number)
        function convertResponse(input) {
            var output = [];

            _.each(input, function(item) {
                var googleRanking = item.g;

                if (googleRanking < 2) {
                    item.ranking = 1;
                } else if(googleRanking < 4){
                    item.ranking = 2;
                } else if(googleRanking < 11) {
                    item.ranking = 3;
                } else {
                    item.ranking = 4;
                }

                output.push(item);
            });

            return output;
        }

        // Change table index when table is paginationed.
        function changeTablePage(page) {
            vm.currentPage = page;
        }

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
                        vm.textCopyState = 'Click to copy to clipboard';
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
    }

})(angular);