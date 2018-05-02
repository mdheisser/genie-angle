(function () {
    'use strict';

    angular
        .module('components.pages')
        .controller('pagesKeywordChartController', pagesKeywordChartController)

    pagesKeywordChartController.$inject = [
        '$rootScope', '$scope', '$window', '$stateParams', '$timeout', '$mdDialog',
        'Notify', 'filterFilter', 'pagesService', 'keywordData'];

    function pagesKeywordChartController(
        $rootScope, $scope, $window, $stateParams, $timeout, $mdDialog,
        Notify, filterFilter, pagesService, keywordData) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.keywordData = {};
        vm.reportDate = '1. 22.2018';

        activate();

        //////////////

        function activate() {
            vm.keywordData = keywordData;
            drawCharts();
            var data = [{
                    id: 0,
                    name: 'ALL'
                },
                {
                    id: 1,
                    name: '360'
                },
                {
                    id: 2,
                    name: '180'
                },
                {
                    id: 3,
                    name: '90'
                },
                {
                    id: 4,
                    name: '30'
                }
            ];
            vm.filterDays = data;
            vm.selectedDay = data[1];
        }

        function drawCharts() {

            var chartOptions = {
                chart: {
                    width: 600,
                    height: 300
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                series: [{
                    name: 'Google',
                    data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
                    zones: [{
                        color: '#DB3236'
                    }],
                    color: '#DB3236'
                }, {
                    name: 'Yahoo.UK',
                    data: [39, 75, 16, 19, 174, 16, 235, 178, 276, 294, 195, 154],
                    zones: [{
                        color: '#410093'
                    }],
                    color: '#410093'
                }]
            };

            vm.chartOptions = chartOptions;
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

    }

})();