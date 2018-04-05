(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesManageController', pagesManageController)

    pagesManageController.$inject = ['$scope', '$window', 'Notify', 'filterFilter', 'commonService', 'convertPagesManageDataFilter'];

    function pagesManageController($scope, $window, Notify, filterFilter, commonService, convertPagesManageDataFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.allRowsMarked = false;
        vm.bulkActions = [];
        vm.copyToClipboard = copyToClipboard
        vm.currentPage = 1;
        vm.filterOn = false;
        vm.itemsByPage = [];
        vm.openPageActions = openPageActions
        vm.openPageUrl = openPageUrl
        vm.pagesList = [];
        vm.performBulkAction = performBulkAction
        vm.resetPagesFilter = resetPagesFilter;
        vm.selectedSite = {};
        vm.sites = [];

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
    }

})();