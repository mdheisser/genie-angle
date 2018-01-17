/**=========================================================
 * Module: chart.controller.js
 * Controller for ChartJs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartJSController', ChartJSController);

    ChartJSController.$inject = ['Colors'];

    function ChartJSController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            // Line chart
            // -----------------------------------
            vm.lineLabels = ["January", "February", "March", "April", "May", "June", "July"];
            vm.lineSeries = ['Series A', 'Series B'];
            vm.lineData = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            vm.lineOnClick = function(points, evt) {
                console.log(points, evt);
            };
            vm.lineDatasetOverride = [{
                yAxisID: 'y-axis-1'
            }, {
                yAxisID: 'y-axis-2'
            }];
            vm.lineOptions = {
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }, {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }]
                }
            };
            vm.lineColors = [Colors.byName('info'), Colors.byName('purple')];

            // Bar Chart
            // ------------------
            vm.barLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            vm.barSeries = ['Series A', 'Series B'];
            vm.barData = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            vm.barColors = [{
                backgroundColor: Colors.byName('primary'),
                borderColor: Colors.byName('primary')
            }, {
                backgroundColor: Colors.byName('info'),
                borderColor: Colors.byName('info')
            }]

            // Polar Area Chart
            // ------------------
            vm.polarLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales"];
            vm.polarData = [300, 500, 100, 40];
            vm.polarColors = [Colors.byName('pink'), Colors.byName('purple'), Colors.byName('pink'), Colors.byName('purple')];

            // Radar Chart
            // ------------------
            vm.radarLabels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
            vm.radarData = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];
            vm.radarColors = [Colors.byName('purple'), Colors.byName('info')];

            // Pie Chart
            // ------------------
            vm.pieLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            vm.pieData = [300, 500, 100];
            vm.pieColors = [Colors.byName('info'), Colors.byName('purple'), Colors.byName('yellow')];

            // Doughnut Chart
            // ------------------
            vm.douLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            vm.douData = [300, 500, 100];
            vm.douColors = [Colors.byName('info'), Colors.byName('purple'), Colors.byName('yellow')];

        }
    }
})();