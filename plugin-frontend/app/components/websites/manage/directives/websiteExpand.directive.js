(function (angular) {
    'use strict';

    angular
        .module('components.websites')
        .directive('websiteExpand', websiteExpand);

    websiteExpand.$inject = [];

    function websiteExpand() {
        var directive = {
            restrict: 'EA',
             templateUrl: '/app/components/websites/manage/templates/websiteExpand.html',
            link: link
        };

        return directive;

        function link(scope, element, attr, table) {
            //
        }
    }

})(angular);