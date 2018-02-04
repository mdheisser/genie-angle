 (function (angular) {
     'use strict';

     angular
         .module('components.keywords')
         .controller("keywordsController", keywordsController);
     keywordsController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'keywordsService', '$uibModal', 'toastr', 'ngDialog'];

     function keywordsController($scope, $timeout, $resource, $q, $location, keywordsService, $uibModal, toastr, ngDialog) {
         var vm = this;
         vm.addKeywordsOpenDialog = addKeywordsOpenDialog;

         activate();

         ///////////////////////

         function activate() {
             // 
         }

         function addKeywordsOpenDialog() {
             ngDialog.open({
                 template: 'app/views/modals/addKeywords.html',
                 className: 'ngdialog-theme-default add-keywords',
                 showClose: false
             });
         }

         $scope.loading = true;


         $scope.currentSite = {
             siteId: "1",
             name: "SEOgenie"
         };


         $scope.initKnobs = function (pageList) {};


         var init = function () {
             // Ajax
             vm.keywords = [];

             var postData = {
                 siteId: "1"
             }

             keywordsService.getKeywords(postData).then(function (response) {
                 $scope.loading = false;
                 console.log(response);
                 if (response.data) {
                     vm.keywords = angular.fromJson(response.data);
                     console.log(vm.keywords);
                 } else {
                     // No data
                 }


             }, function (errResponse) {
                 if (errResponse && errResponse.data && errResponse.data.Message) {
                     toastr.error('Can\'t retrieve data', 'Error');
                 }
             });


             $scope.$on('panel-refresh', function (event, id) {
                 var secs = 3;
                 console.log('Refreshing during ' + secs + 's #' + id);
                 $timeout(function () {
                     // directive listen for to remove the spinner 
                     // after we end up to perform own operations
                     $scope.$broadcast('removeSpinner', id);

                     console.log('Refreshed #' + id);

                 }, 3000);

             });
         };

         init();


         $scope.refreshGrid = function () {
             vm.pages = [];
             $scope.loading = true;
             keywordsService.getKeywords(1).then(function (response) {
                 $scope.loading = false;
                 vm.pages = response.data;
             });
         };

         $scope.addKeywordsOpenDialog = function () {
             var modalDialog = $uibModal.open({
                 animation: true,
                 ariaLabelledBy: 'modal-title',
                 ariaDescribedBy: 'modal-body',
                 //appendTo: 'body',
                 resolve: {
                     items: function () {
                         //return $akm.items;
                     }
                 },
                 templateUrl: function (element, attrs) {
                     return 'app/views/modals/addKeywords.html';
                 },
                 scope: $scope,
                 controller: 'addKeywordModalController',
                 backdrop: 'static',
                 keyboard: false,
                 size: 'lg'
             });

             $scope.addKeywordsModal = modalDialog;

             modalDialog.result.then(function (result) {
                 console.log(result);
             }, function (error) {
                 if (error && error.data && error.data.Message) {
                     toastr.error('Can\'t add keywords', 'Error');
                 }
             });
         };
     }

 })(angular);