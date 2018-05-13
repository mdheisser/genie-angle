(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordExpandController', keywordExpandController)

    keywordExpandController.$inject = ['$scope', '$mdDialog', 'keywordsService', 'convertPageDataFilter'];

    function keywordExpandController($scope, $mdDialog, keywordsService, convertPageDataFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.keywordDetailCollection = [];
        vm.detailCurrentPage = 1;
        vm.openPageInfo = openPageInfo;
        vm.openKeywordModal = openKeywordModal;
        vm.openKeywordViolationPopup = openKeywordViolationPopup;
        vm.openPageActionPane = openPageActionPane;
        vm.openPageKeywordPopup = openPageKeywordPopup;
        vm.onSelectKeywordDetail = onSelectKeywordDetail;

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
            vm.detailItemsByPage = dropdownOptions;
            vm.detailNumberOfRows = dropdownOptions[1];

            getKeywordDetail('111');
        }

        // Get selected keyword's detail information.
        function getKeywordDetail(keywordID) {
            keywordsService
                .getKeywordDetail(keywordID)
                .then(function (response) {
                    vm.keywordDetailCollection = convertPageDataFilter(response.data);

                    vm.showDetailAdditionalFilter = true;

                    // Set filter for assigned pages.
                    $scope.$broadcast('setupFilterForAssignedPages');
                });
        }

        
        // Reset Page Fitler.
        function resetPageFilter() {
            if (vm.detailFilterOn === true) {
                $scope.$broadcast('resetPageFilter');
            }
        }

        // Set detail filter on/off switch status.
        $scope.$watch('keywordPage', function() {
            if ($scope.keywordPage != undefined) {
                var original = vm.keywordDetailCollection.length;
                var filtered = $scope.keywordPage.length;
                if(original != filtered) {
                    vm.detailFilterOn = true;
                } else {
                    vm.detailFilterOn = false;
                }
            }
        });

        // Open Page Info Popup
        function openPageInfo(row, event) {
            $mdDialog.show({
                locals:{
                    pageData: row
                },
                controller: 'keywordPageInfoController',
                controllerAs: 'kpic',
                templateUrl: 'app/components/keywords/manage/templates/keywordPageInfo.html',
                targetEvent: event,
            })
            .then(function(answer) {
                //
            }, function() {
                //
            });

            event.stopPropagation();
        }

        // Open KeywordsPopup
        function openKeywordModal(row, event) {
            $mdDialog.show({
                locals:{
                    pageData: row
                },
                controller: 'keywordPageKeywordController',
                controllerAs: 'kpkc',
                templateUrl: 'app/components/keywords/manage/templates/keywordPageKeyword.html',
                targetEvent: event,
            })
            .then(function(answer) {
                //
            }, function() {
                //
            });

            event.stopPropagation();
        }

        // Open Keyword Violation Popup
        function openKeywordViolationPopup(row, event) {
            $mdDialog.show({
                locals:{
                    pageData: row
                },
                controller: 'keywordPageViolationController',
                controllerAs: 'kpvc',
                templateUrl: 'app/components/keywords/manage/templates/keywordPageViolation.html',
                targetEvent: event,
            })
            .then(function(answer) {
                //
            }, function() {
                //
            });

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
    }

})(angular);