(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('convertPageData', convertPageData)

    convertPageData.$inject = [];

    function convertPageData() {

        return function (input) {
            var output = [];

            _.each(input, function(item) {
                var assign = item.assignedState;

                if (assign == true) {
                    item.assign = 'assign';
                } else {
                    item.assign = 'not-assign';
                }

                item.showActions = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);