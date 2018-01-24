(function () {
    'use strict';

    keywordsApp.controller("keywordModalCtrl", keywordModalCtrl);
    keywordModalCtrl.$inject = ['$scope'];    

    function keywordModalCtrl ($scope) {
    	var vm = this;
    	vm.sites = [
            { id: 1, name: 'www.umm.com' },
            { id: 2, name: 'www.uee.com' }
        ];
        
        activate();

        //////////////////////

        function activate () {
        	// 
        }
    }

})();