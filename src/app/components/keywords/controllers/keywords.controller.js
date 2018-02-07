(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller("keywordsController", keywordsController);
    keywordsController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'keywordsService', 'toastr', 'ngDialog'];

    function keywordsController($scope, $timeout, $resource, $q, $location, keywordsService, toastr, ngDialog) {
        var vm = this;
        vm.activeTab = 1;
        vm.addKeywordsOpenDialog = addKeywordsOpenDialog;

        activate();

        ///////////////////////

        function activate() {
            setRoute(); 
        }

        // Show add keywords modal.
        function addKeywordsOpenDialog() {
            ngDialog.open({
                template: 'app/views/modals/addKeywords.html',
                className: 'ngdialog-theme-default add-keywords',
                showClose: false
            });
        }

        // Define the behavior for sidebar menu.
        function setRoute() {
            switch($location.path()) {
                case '/app/keywords/dashboard':
                    vm.activeTab = 1;
                    break;
                case '/app/keywords/list':
                    vm.activeTab = 2;
                    break;
                case '/app/keywords/add-keywords':
                    addKeywordsOpenDialog();
                    break;
                case '/app/keywords/dashboard/statistics':
                    vm.activeTab = 1;
                    var panel = angular.element(document.querySelector('#statistics .panel-body'));
                    var arrowDown = angular.element(document.querySelector('#statistics .panel-heading em:nth-child(1)'));
                    var arrowUp = angular.element(document.querySelector('#statistics .panel-heading em:nth-child(2)'));
                    panel.addClass('in');
                    panel.removeAttr('style');
                    arrowUp.removeClass('ng-hide');
                    arrowDown.addClass('ng-hide');
                    break;
                case '/app/keywords/dashboard/engines':
                    vm.activeTab = 1;
                    var panel = angular.element(document.querySelector('#searchEngine .panel-body'));
                    var arrowDown = angular.element(document.querySelector('#searchEngine .panel-heading em:nth-child(1)'));
                    var arrowUp = angular.element(document.querySelector('#searchEngine .panel-heading em:nth-child(2)'));
                    panel.addClass('in');
                    panel.removeAttr('style');
                    arrowUp.removeClass('ng-hide');
                    arrowDown.addClass('ng-hide');
                    break;
                case '/app/keywords/dashboard/ranking':
                    vm.activeTab = 1;
                    var panel = angular.element(document.querySelector('#chartsPanel .panel-wrapper'));
                    var arrowDown = angular.element(document.querySelector('#chartsPanel .panel-heading em:nth-child(1)'));
                    var arrowUp = angular.element(document.querySelector('#chartsPanel .panel-heading em:nth-child(2)'));
                    panel.addClass('in');
                    panel.removeAttr('style');
                    arrowUp.removeClass('ng-hide');
                    arrowDown.addClass('ng-hide');
                    break;
                default:
                    vm.activeTab = 1;
            }
        }

        // Detect the changing of the route.
        $scope.$on('$locationChangeStart', function(event) {
            setRoute();
        })
    }

})(angular);