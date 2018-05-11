(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesKeywordSettingController', pagesKeywordSettingController)

    pagesKeywordSettingController.$inject = [
        '$scope', '$mdDialog',
        'websitesService', 'keywordsService', 'keywordData', 'convertPageDataFilter'];

    function pagesKeywordSettingController(
        $scope, $mdDialog,
        websitesService, keywordsService, keywordData, convertPageDataFilter) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.keywordData = {};
        vm.currentPage = 1;
        vm.keywordDetailCollection = [];
        vm.resetPageFilter = resetPageFilter;

        activate();

        //////////////

        function activate() {
            vm.keywordData = keywordData;

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

            // Init dropdown options for grids.
            var dropdownOptions =  [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: 'All', value: '9999' }
            ];
            vm.itemsByPage = dropdownOptions;
            vm.numberOfRows = dropdownOptions[1];

            getLanguages();
            getKeywordDetail('111');
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

        // Gey available languages.
        function getLanguages(siteId) {
            websitesService
                .getLanguages(siteId)
                .then(function (response) {
                    vm.languages = response.data;
                });
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
        $scope.$watch('pageKeywordPage', function() {
            if ($scope.pageKeywordPage != undefined) {
                var original = vm.keywordDetailCollection.length;
                var filtered = $scope.pageKeywordPage.length;
                if(original != filtered) {
                    vm.detailFilterOn = true;
                } else {
                    vm.detailFilterOn = false;
                }
            }
        });
    }

})();