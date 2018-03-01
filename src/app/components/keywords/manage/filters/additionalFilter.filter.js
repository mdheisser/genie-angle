(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .filter('additionalFilter', additionalFilter)

    additionalFilter.$inject = ['$filter'];

    function additionalFilter($filter) {
        var filterFilter = $filter('filter');
        var standardComparator = function standardComparator(obj, text) {
            text = ('' + text).toLowerCase();

            var condition = localStorage.getItem('searchCondition');

            switch(condition) {
                case '1':
                    return ('' + obj).toLowerCase().indexOf(text) > -1;
                case '2':
                    return ('' + obj).toLowerCase().indexOf(text) == -1;
                case '3':
                    return ('' + obj).toLowerCase().startsWith(text);
                case '4':
                    return ('' + obj).toLowerCase().endsWith(text);
                default:
                    return ('' + obj).toLowerCase().indexOf(text) > -1;
            }
        };

        return function customFilter(array, expression) {
            function customComparator(actual, expected) {
                if (angular.isObject(expected)) {

                    //matchAny
                    if (expected.matchAny) {
                        if (expected.matchAny.all) {
                            return true;
                        }

                        if (!actual) {
                            return false;
                        }

                        for (var i = 0; i < expected.matchAny.items.length; i++) {
                            if (actual == expected.matchAny.items[i]) {
                                return true;
                            }
                        }

                        return false;
                    }

                    return true;

                }
                return standardComparator(actual, expected);
            }

            var output = filterFilter(array, expression, customComparator);
            return output;
        };
    }

})(angular);