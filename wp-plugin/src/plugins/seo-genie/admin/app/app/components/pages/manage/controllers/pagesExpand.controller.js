(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesExpandController', pagesExpandController)

    pagesExpandController.$inject = ['$scope', '$mdDialog', 'keywordsService', 'pagesService', 'convertKeywordDataFilter'];

    function pagesExpandController($scope, $mdDialog, keywordsService, pagesService, convertKeywordDataFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.init = init;
        vm.pagesExpandCollection = [];
        vm.pageViolationCollection = [];
        vm.detailCurrentPage = 1;
        vm.violationCurrentPage = 1;
        vm.resetPageKeywordFilter = resetPageKeywordFilter;
        vm.onPageKeywordAction = onPageKeywordAction;
        vm.showKeywordChart = showKeywordChart;
        vm.showKeywordSetting = showKeywordSetting;
        vm.resetViolationFilter = resetViolationFilter;
        vm.onActivePromotedKeyword = onActivePromotedKeyword;

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
        }

        // Initialize
        function init(pageID) {
            getAssignedKeywords(pageID);
        }

        // Get selected keyword's detail information.
        function getAssignedKeywords(pageID) {
            pagesService
                .getPageDetail(pageID)
                .then(function (response) {
                    vm.pagesExpandCollection = convertKeywordDataFilter(response.data.autoKeywordIDs);
                    vm.pageViolationCollection = response.data.violations;
                    vm.showExpandAdditionalFilter = true;
                    vm.showPageKeywordFilterPane = true;

                    // Set filter for assigned keywords.
                    $scope.$broadcast('setupFilterForAssignedKeywords');
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

        // Active/Deactive promoted keyword.
        function onActivePromotedKeyword(row) {

            var keywordID = row._id;

            if (row.category.promoted === true) {
                var data = {
                    isPromoted: true,
                    isMonitored: true
                }
                keywordsService
                    .updateKeyword(keywordID, data)
                    .then(function (response) {
                        console.log('Activate promoted keyword!');
                        console.log(response.data);
                        getKeywords(vm.selectedSite._id);
                    });
            } else {
                var data = {
                    isPromoted : false
                }
                keywordsService
                    .updateKeyword(keywordID, data)
                    .then(function (response) {
                        console.log('Deactivate promoted keyword');
                        console.log(response.data);
                        getKeywords(vm.selectedSite._id);
                    });
            }
        }
    }

})(angular);