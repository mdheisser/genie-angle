(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordsListController', keywordsListController)

    keywordsListController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'keywordsService'];

    function keywordsListController($scope, $timeout, $resource, $q, $location, keywordsService) {
        /* jshint validthis:true */
        var vm = this;
        vm.site = {};
        vm.site.selected = undefined;
        vm.sites = [];
        vm.keywords = [];

        activate();

        //////////////

        function activate() {
            getOwnSites();
            // getKeywordsList();
            // return getTerms().then(function() {
            //     console.log('-------------------------');
            // });
        }

        function getOwnSites() {
            var data = [{
                    id: 1,
                    name: 'www.umm.com'
                },
                {
                    id: 2,
                    name: 'www.uee.com'
                }
            ];
            vm.sites = data;

        }

        function getKeywordsList() {
            return keywordsService.getTerms({
                    siteId: '1',
                    type: "Prefix"
                })
                .then(function (data) {
                    console.log(data);
                    return data;
                });
        }
    }

})(angular);