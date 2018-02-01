(function() {
    'use strict';

    angular
        .module('components.keywords')
        .controller('accordionController', accordionController);

    accordionController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location'];

    function accordionController($scope, $timeout, $resource, $q, $location) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        //////////////

        function activate() {

            vm.panels = [
                { id: 0, selected: true, view: 'app/views/partials/keywords-dashboard.html' },
                { id: 1, selected: false, view: 'app/views/partials/keywords-list.html' },
            ];

            vm.leaveCollapse = function(id) {
                for (var item in vm.panels) {
                    vm.panels[item].selected = (id == item) ? true : false;
                }
            };
        }
    }

})();