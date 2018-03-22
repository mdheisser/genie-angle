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

                if (item.auto_keywords > 0) {
                    item.auto_assign = true;
                } else {
                    item.auto_assign = false;
                }

                item.showActions = false;
                item.showKeywordsPopup = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);