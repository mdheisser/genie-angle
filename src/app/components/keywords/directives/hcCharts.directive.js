 (function (angular) {
     'use strict';

     angular
         .module('components.keywords')
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

         function drawChart(scope, element) {
             setTimeout(function () {
                 Highcharts.chart(element[0], scope.options);
             }, 500);
         }
     }

 })(angular);