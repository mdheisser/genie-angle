 /**=========================================================
 * Controller: keywordModal.controller.js
 * @desc Add Keywords Modal controller
 =========================================================*/
 
(function () {
    'use strict';

    keywordsApp.controller("keywordModalCtrl", keywordModalCtrl);
    keywordModalCtrl.$inject = ['$scope'];    

    function keywordModalCtrl ($scope) {
        var vm = this;
        vm.sites = [];

        activate();

        //////////////////////

        function activate () {
            init();
        }

        function init () {
            vm.sites = [
                { id: 1, name: 'www.umm.com' },
                { id: 2, name: 'www.uee.com' }
            ];
        }
    }

})();