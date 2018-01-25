 /**=========================================================
 * Directive: hcCharts.directive.js
 * @desc Chart based on Highcharts
 * @example <div hc-charts></div>
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.keywords')
        .directive('hcCharts', hcCharts);

    hcCharts.$inject = ['$window'];

    function hcCharts($window) {
        var directive = {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                drawChart(scope, element);
                angular.element($window).bind('resize', function () {
                    drawChart(scope, element);
                });
            }
        };
        return directive;

        function drawChart (scope, element) {
            setTimeout(function(){
                Highcharts.chart(element[0], scope.options);
            },500);
        }
    }

})();