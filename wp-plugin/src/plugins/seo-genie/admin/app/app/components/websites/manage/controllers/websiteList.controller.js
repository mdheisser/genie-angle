(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteListController', websiteListController)

    websiteListController.$inject = ['$scope', '$filter', '$window', '$localStorage', '$location', '$mdDialog', 'Notify', 'commonService'];

    function websiteListController($scope, $filter, $window, $localStorage, $location, $mdDialog, Notify, commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.currentPage = 1;
        vm.websitesList = [];
        vm.resetWebsiteFilter = resetWebsiteFilter;
        vm.performBulkAction = performBulkAction;
        vm.openWebsiteUrl = openWebsiteUrl;
        vm.expandWebsiteDetail = expandWebsiteDetail;
        vm.openRankingGraph = openRankingGraph;
        vm.generateReport = generateReport;

        activate();

        //////////////

        function activate() {
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
            // Get sites information
            commonService
                .getUserSites('1')
                .then(function(resp) {
                    var convertor = $filter('convertWebsiteData');
                    vm.websitesList = convertor(resp.data);
                    setRoute();
                });
        }

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/websites-manage/best':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForBestWebsites'); 
                    break;
                case '/app/websites-manage/least':
                    vm.showAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForLeastWebsites');
                    break;
            }
        }

        // Reset Pages Fitler.
        function resetWebsiteFilter() {
            if (vm.filterOn === true) {
                $scope.$broadcast('resetWebsiteFilter');
            }
        }

        // Set filter on/off switch status.
        $scope.$watch('websiteList', function() {
            if ($scope.websiteList != undefined) {
                var original = vm.websitesList.length;
                var filtered = $scope.websiteList.length;
                if(original != filtered) {
                    vm.filterOn = true;
                } else {
                    vm.filterOn = false;
                }
            }
        });

        // Mark/Unmark all rows
        $scope.$watch(function () {
            return vm.allRowsMarked;
        }, function (current, original) {
            _($scope.websiteList).forEach(function (value, index) {
                if (current === true) {
                    $scope.websiteList[index].selected = true;
                } else {
                    $scope.websiteList[index].selected = false;
                }
            });
        });

        // Perform bulk action
        function performBulkAction(name) {
            var selectedRows = $filter('filter')($scope.websiteList, {selected: true});
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

        // Open website on new tab.
        function openWebsiteUrl(row, event) {
            var url = 'http://' + row.name;
            $window.open(url, '_blank');
            event.stopPropagation();
        }

        // Expand Keyword Detail Page
        function expandWebsiteDetail(row, e, focus) {
            _.each(vm.websitesList, function(value, key) {
                if (row != value) {
                    vm.websitesList[key].expanded = false;
                }
            });
            row.expanded = !row.expanded;
            vm.savedExpandedRowId = row.id;

            if (row.expanded == true) {
                var data = {};
                data.website_setting = false;
                data.website_sitemap = false;
                data.pages_assign_key = true;
                data.website_pages = true;
                data.pages_violation = true;

                if (focus == 1) {
                    data.website_setting = true;
                    data.website_sitemap = true;
                    data.pages_violation = false;
                }
                if (focus == 2) {
                    data.website_setting = true;
                    data.website_sitemap = true;
                    data.pages_assign_key = false;
                }
                if (focus == 3) {
                    data.website_setting = true;
                    data.website_sitemap = true;
                    data.website_pages = false;
                }
                $localStorage['panelState'] = angular.toJson(data);
            }

            e.stopPropagation();
        }

        // Show Keywords chart on popup
        function openRankingGraph(row, event) {
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

        // Generate Report
        function generateReport(e) {
            Notify.alert(
                'Generated Report',
                {status: 'success', pos: 'top-right'}
            );
            e.stopPropagation();
        }

    }

})(angular);