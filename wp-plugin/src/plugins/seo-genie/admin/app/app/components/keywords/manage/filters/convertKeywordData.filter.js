(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('convertKeywordData', convertKeywordData)

    convertKeywordData.$inject = [];

    function convertKeywordData() {

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
                item.expanded = false;
                item.showActions = false;
                item.forced_min = 1;
                item.forced_max = 7;
                item.auto_assign = false;
                item.keyword = item.text;
                // item.g = item.googleRanking;
                // item.y = item.yahooRanking;
                // item.m = item.bingRanking;
                item.category = {
                    defalut: item.isDefault,
                    promoted: item.isPromoted,
                    monitored: item.isMonitored,
                    forced: item.isForced
                }

                output.push(item);
            });

            return output;
        };
    }

})(angular);