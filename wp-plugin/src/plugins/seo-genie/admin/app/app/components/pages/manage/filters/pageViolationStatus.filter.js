(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .filter('pageViolationStatus', pageViolationStatus)

    pageViolationStatus.$inject = [];

    function pageViolationStatus() {

        return function (input) {
            var output;

            switch(input) {
                case 1:
                    output = 'Critical';
                    break;
                case 2:
                    output = 'Warning';
                    break;
                case 3:
                    output = 'Notice';
                    break;
                case 4:
                    output = 'Resolved';
                    break;
            }

            return output;
        };
    }

})(angular);