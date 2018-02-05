(function() {
    'use strict';

    angular
        .module('components.keywords')
        .controller('dashboardController', dashboardController)

    dashboardController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location'];

    function dashboardController($scope, $timeout, $resource, $q, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.site = {};
        vm.site.selected = undefined;
        vm.sites = [];
        vm.analyzeKeywords = [];
        vm.chartOptions = undefined;
        vm.reportDate = '1. 22.2018';
        vm.filterDays = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
            getKeywordStatistics();
            drawCharts();
            getFilerDays();
        }

        function getOwnSites() {
            var data = [
                { id: 1, name: 'www.umm.com' },
                { id: 2, name: 'www.uee.com' }
            ];
            vm.sites = data;
            vm.site.selected = data[0].name;
        }

        function getFilerDays() {
            var data = [
                { id: 1, name: '360' },
                { id: 2, name: '180' },
                { id: 3, name: '90' },
                { id: 4, name: '30' }
            ];
            vm.filterDays = data;
            vm.selectedDay = data[0];
        }

        function getKeywordStatistics() {
            var data = [
                { id: 1, name: 'Number of Active Keywords Being Promoted', value: 534 },
                { id: 2, name: 'Number of Active Keywords Being Monitored', value: 787 },
                { id: 3, name: 'Average number of Keywords assignd to a Page', value: 4 },
                { id: 4, name: 'Average Keywords Page Position', value: 4 },
                { id: 5, name: 'Best Performing Keyword', value: 87 },
                { id: 6, name: 'Least performing keywords', value: 47 }
            ];
            vm.analyzeKeywords = data;
        }

        function drawCharts() {

            var chartHeight = 350;

            var chartOptions = {
                chart: {
                    height: chartHeight
                },
                title: { text: '' },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: { text: '' }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },
                series: [{
                    name: 'Google',
                    data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]
                }, {
                    name: 'Yahoo',
                    data: [39, 75, 16, 19, 174, 16, 235, 178, 276, 294, 195, 154]
                }]
            };

            vm.chartOptions = chartOptions;
        }
    }

})();