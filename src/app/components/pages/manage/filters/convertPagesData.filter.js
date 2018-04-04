(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('convertPagesManageData', convertPagesManageData)

    convertPagesManageData.$inject = [];

    function convertPagesManageData() {

        return function (input) {
            var output = [];

            _.each(input, function(item) {
                var assign = item.assignedState;
                var promoted = item.category.promoted;

                if (assign == true) {
                    item.assign = 'assign';
                } else {
                    item.assign = 'not-assign';
                }

                if (promoted == true) {
                    item.promoted = 'promoted';
                } else {
                    item.promoted = 'not-promoted';
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