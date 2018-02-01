 (function (angular) {
     'use strict';

     angular
         .module('components.keywords')
         .controller("keywordModalCtrl", keywordModalCtrl);
     keywordModalCtrl.$inject = ['$scope'];

     function keywordModalCtrl($scope) {
         var vm = this;
         vm.sites = [];

         activate();

         //////////////////////

         function activate() {
             init();
         }

         function init() {
             vm.sites = [{
                     id: 1,
                     name: 'www.umm.com'
                 },
                 {
                     id: 2,
                     name: 'www.uee.com'
                 }
             ];
         }
     }

 })(angular);