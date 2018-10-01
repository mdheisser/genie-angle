(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .directive('websitePages', websitePages);

    websitePages.$inject = [];

    function websitePages() {
        var directive = {
            restrict: 'EA',
             templateUrl: '/app/components/websites/manage/templates/websitePages.html',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            //
        }
    }

})(angular);