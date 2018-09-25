(function (angular) {
    'use strict';

    angular
        .module('components.directives')
        .directive('serpChart', serpChart);

    serpChart.$inject = [];

    function serpChart() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/app/components/_common/directives/chart/serpChart.html',
            scope: {
                config: '=',
                height: '@'
            },
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {

            // Set default height of chart.
            if (scope.height == '') {
                scope.height = 400;
            }

            // Basic Configuration for high chart.
            scope.config = {
                chart: {
                    height: scope.height
                },
                title: {
                    text: '',
                    style: {
                        fontSize: '15px'
                    }
                },
                xAxis: {},
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
                credits: {
                    enabled: false
                }
            };

            scope.reportDate = '2018-05-09';

            // Options for selecting filter range.
            scope.chartRanges = [{
                    id: 1,
                    name: 'All'
                },
                {
                    id: 2,
                    name: '360'
                },
                {
                    id: 3,
                    name: '180'
                },
                {
                    id: 4,
                    name: '90'
                },
                {
                    id: 5,
                    name: '30'
                }
            ];

            scope.selectedRange = scope.chartRanges[0];

            // Draw chart with data.
            function drawChart() {
                scope.config.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                scope.config.series = [{
                    name: 'Google',
                    data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
                    zones: [{
                        color: '#DB3236'
                    }],
                    color: '#DB3236'
                }, {
                    name: 'Yahoo',
                    data: [39, 75, 16, 19, 174, 16, 235, 178, 276, 294, 195, 154],
                    zones: [{
                        color: '#410093'
                    }],
                    color: '#410093'
                }];
            }

            drawChart();

            // Change the range on the chart
            scope.changeChartRange = function() {
                switch(scope.selectedRange.name) {
                    case 'All' :
                        drawChart();
                        break;
                    case '360' :
                        scope.config.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        scope.config.series = [{
                            name: 'Google',
                            data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
                            zones: [{
                                color: '#DB3236'
                            }],
                            color: '#DB3236'
                        }, {
                            name: 'Yahoo',
                            data: [39, 75, 16, 19, 174, 16, 235, 178, 276, 294, 195, 154],
                            zones: [{
                                color: '#410093'
                            }],
                            color: '#410093'
                        }];
                        break;
                    case '180' :
                        scope.config.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                        scope.config.series = [{
                            name: 'Google',
                            data: [29, 71, 106, 129, 144, 176],
                            zones: [{
                                color: '#DB3236'
                            }],
                            color: '#DB3236'
                        }, {
                            name: 'Yahoo',
                            data: [39, 75, 16, 19, 174, 16],
                            zones: [{
                                color: '#410093'
                            }],
                            color: '#410093'
                        }];
                        break;
                    case '90' :
                        scope.config.xAxis.categories = ['Jan', 'Feb', 'Mar'];
                        scope.config.series = [{
                            name: 'Google',
                            data: [29, 71, 106],
                            zones: [{
                                color: '#DB3236'
                            }],
                            color: '#DB3236'
                        }, {
                            name: 'Yahoo',
                            data: [39, 75, 16],
                            zones: [{
                                color: '#410093'
                            }],
                            color: '#410093'
                        }];
                        break;
                    case '30' :
                        scope.config.xAxis.categories = ['1', '5', '10', '15', '20', '25', '30'];
                        scope.config.series = [{
                            name: 'Google',
                            data: [29, 71, 106, 129, 144, 176, 123],
                            zones: [{
                                color: '#DB3236'
                            }],
                            color: '#DB3236'
                        }, {
                            name: 'Yahoo',
                            data: [39, 75, 16, 19, 174, 16, 78],
                            zones: [{
                                color: '#410093'
                            }],
                            color: '#410093'
                        }];
                        break;
                }
            }
        }
    }

})(angular);