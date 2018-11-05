(function (angular) {
    'use strict';

    angular
        .module('components.factories')
        .factory('highchartFactory', highchartFactory);

    highchartFactory.$inject = [];

    function highchartFactory() {

        return {
            getAreaChartConfig: getAreaChartConfig,
            getPieChartConfig: getPieChartConfig
        };

        // Area Chart Config
        function getAreaChartConfig(data) {
            return {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Traffic'
                },
                subtitle: {
                    text: 'Last 30 days'
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Users'
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{point.y:,.0f}'
                },
                plotOptions: {
                    area: {
                        pointStart: 1940,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Users',
                    data: data
                }]
            }
        }

        // Pie Chart Config
        function getPieChartConfig(data) {
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Keywords positions'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: data
                }]
            }
        }
    }

})(angular);