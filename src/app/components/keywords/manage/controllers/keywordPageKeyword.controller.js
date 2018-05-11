(function () {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordPageKeywordController', keywordPageKeywordController)

    keywordPageKeywordController.$inject = [
        '$scope', '$mdDialog',
        'keywordsService', 'pageData', 'convertPageKeywordsFilter'];

    function keywordPageKeywordController(
        $scope, $mdDialog,
        keywordsService, pageData, convertPageKeywordsFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.currentPage = 1;
        vm.rowCollection = [];
        vm.resetPageKeywordFilter = resetPageKeywordFilter;

        activate();

        //////////////

        function activate() {
            vm.pageData = pageData;
            // Set value for number of row by page in dropdown.
            vm.itemsByPage =  [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: 'All', value: '9999'}
            ];

            vm.numberOfRows = vm.itemsByPage[1];
            getKeywords('1');
        }

        function getKeywords(siteId) {
            keywordsService
                .getKeywords(siteId)
                .then(function (response) {
                    vm.rowCollection = convertPageKeywordsFilter(response.data);
                    // Set filter for assigned keywords.
                    vm.showExpandAdditionalFilter = true;
                    $scope.$broadcast('setupFilterForAssignedKeywords');
                });
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

        // Reset Keyword Fitler.
        function resetPageKeywordFilter() {
            if (vm.filterOn === true) {
                $scope.$broadcast('resetPageKeywordFilter');
            }
        }

        $scope.$watch('keywordPageKeyword', function() {
            if ($scope.keywordPageKeyword != undefined) {
                var original = vm.rowCollection.length;
                var filtered = $scope.keywordPageKeyword.length;
                if(original != filtered) {
                    vm.filterOn = true;
                } else {
                    vm.filterOn = false;
                }
            }
        });

    }

})();