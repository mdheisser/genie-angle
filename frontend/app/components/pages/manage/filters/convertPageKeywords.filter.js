(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .filter('convertPageKeywords', convertPageKeywords)

    convertPageKeywords.$inject = [];

    function convertPageKeywords() {

        return function (input) {
            var output = [];

            _.each(input, function(item) {
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

                // Set filter option for assigned state.
                if (item.assignedState == true) {
                    item.keyword_assign = 'assign';

                    // Set filter option for system or manual assigned state.
                    if (item.auto_assign == true) {
                        item.assign_by = 'system';
                    } else {
                        item.assign_by = 'manual';
                    }
                } else {
                    item.keyword_assign = 'not-assign';
                }

                item.selected = false;
                item.expanded = false;
                item.showActions = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);