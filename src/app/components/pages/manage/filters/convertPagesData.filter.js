(function (angular) {
    'use strict';

    angular
        .module('components.pages')
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

                var googleRanking = item.g;

                if (googleRanking < 2) {
                    item.ranking = 1;
                } else if(googleRanking < 4){
                    item.ranking = 2;
                } else if(googleRanking < 11) {
                    item.ranking = 3;
                } else {
                    item.ranking = 4;
                }

                item.showActions = false;
                item.showKeywordsPopup = false;
                item.expanded = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);