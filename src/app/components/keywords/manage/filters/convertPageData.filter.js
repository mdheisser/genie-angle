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

                if (item.manual_keywords > 0) {
                    item.manual_assign = true;
                } else {
                    item.manual_assign = false;
                }

                item.showActions = false;
                item.showKeywordsPopup = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);