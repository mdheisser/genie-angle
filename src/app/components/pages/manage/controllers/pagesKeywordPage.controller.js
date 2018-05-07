(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesKeywordPageController', pagesKeywordPageController)

    pagesKeywordPageController.$inject = [
        '$rootScope', '$scope', '$window', '$stateParams', '$timeout', '$mdDialog',
        'Notify', 'filterFilter', 'pagesService', 'keywordData'];

    function pagesKeywordPageController(
        $rootScope, $scope, $window, $stateParams, $timeout, $mdDialog,
        Notify, filterFilter, pagesService, keywordData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.keywordData = {};

        activate();

        //////////////

        function activate() {
            vm.keywordData = keywordData;
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

    }

})();