(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('convertTableData', convertTableData)

    convertTableData.$inject = [];

    function convertTableData() {

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

                item.selected = false;

                output.push(item);
            });

            return output;
        };
    }

})(angular);