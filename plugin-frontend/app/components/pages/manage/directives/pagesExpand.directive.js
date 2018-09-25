(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .directive('pagesExpand', pagesExpand);

    pagesExpand.$inject = [];

    function pagesExpand() {
        var directive = {
            restrict: 'EA',
             templateUrl: '/app/components/pages/manage/templates/pagesExpand.html',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            //
        }
    }

})(angular);