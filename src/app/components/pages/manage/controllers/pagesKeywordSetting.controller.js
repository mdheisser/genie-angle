(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesKeywordSettingController', pagesKeywordSettingController)

    pagesKeywordSettingController.$inject = [
        '$scope', '$mdDialog',
        'websitesService', 'keywordData'];

    function pagesKeywordSettingController(
        $scope, $mdDialog,
        websitesService, keywordData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.keywordData = {};

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

            getLanguages();
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

    }

})();