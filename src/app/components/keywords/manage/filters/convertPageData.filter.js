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

                // Set filter option for assigned state.
                if (item.assignedState == true) {
                    item.page_assign = 'assign';

                    // Set filter option for system or manual assigned state.
                    if (item.auto_assign == true) {
                        item.assign_by = 'system';
                    } else {
                        item.assign_by = 'manual';
                    }
                } else {
                    item.page_assign = 'not-assign';
                }

                item.showActions = false;
                item.showKeywordsPopup = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);