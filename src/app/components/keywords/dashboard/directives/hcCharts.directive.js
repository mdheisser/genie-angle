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
                 Highcharts.chart(element[0], scope.options);
             }
         };
         return directive;
     }

 })(angular);