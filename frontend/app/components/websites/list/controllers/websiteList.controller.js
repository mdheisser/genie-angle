(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .controller('websiteListController', websiteListController)

    websiteListController.$inject = ['$scope', '$filter', '$window', 'Notify', 'commonService'];

    function websiteListController($scope, $filter, $window, Notify, commonService) {
        /* jshint validthis:true */
        var vm = this;

        vm.currentPage = 1;
        vm.rowCollection = [];
        vm.resetWebsiteFilter = resetWebsiteFilter;
        vm.performBulkAction = performBulkAction;
        vm.openWebsiteUrl = openWebsiteUrl;

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
                    vm.rowCollection = convertor(resp.data);
                });
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
                var original = vm.rowCollection.length;
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
    }

})(angular);