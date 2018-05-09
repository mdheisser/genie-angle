(function () {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordPageInfoController', keywordPageInfoController)

    keywordPageInfoController.$inject = [
        '$scope', '$mdDialog',
        'websitesService', 'pageData'];

    function keywordPageInfoController(
        $scope, $mdDialog,
        websitesService, pageData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.pageData = {};

        activate();

        //////////////

        function activate() {
            vm.pageData = pageData;

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