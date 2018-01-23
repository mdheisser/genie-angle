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

    function hcCharts() {
        var directive = {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                setTimeout(function(){
                    Highcharts.chart(element[0], scope.options);
                },500);
            }
        };
        return directive;
    }

})();