(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesKeywordChartController', pagesKeywordChartController)

    pagesKeywordChartController.$inject = ['$scope', '$mdDialog', 'keywordData'];

    function pagesKeywordChartController($scope, $mdDialog, keywordData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.keywordData = {};
        vm.chartOptions = {};

        activate();

        //////////////

        function activate() {
            vm.keywordData = keywordData;
            drawCharts();
        }

        function drawCharts() {
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

    }

})();