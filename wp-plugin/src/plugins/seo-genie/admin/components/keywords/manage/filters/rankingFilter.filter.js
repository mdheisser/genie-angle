(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('rankingFilter', rankingFilter)

    rankingFilter.$inject = ['$filter'];

    function rankingFilter($filter) {

        return function (input) {
            var bgColors = [
                'bg-red-500',
                'bg-yellow-700',
                'bg-green-500',
                'bg-green-300'
            ];

            var output = '';

            if (input < 2) {
                output = bgColors[0];
            } else if(input < 4){
                output = bgColors[1];
            } else if(input < 11) {
                output = bgColors[2];
            } else {
                output = bgColors[3];
            }

            return output;
        };
    }

})(angular);