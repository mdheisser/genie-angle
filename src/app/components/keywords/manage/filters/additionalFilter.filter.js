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
            return ('' + obj).toLowerCase().indexOf(text) > -1;
        };

        return function customFilter(array, expression) {
            function customComparator(actual, expected) {

                if (angular.isObject(expected)) {
                    //exact match
                    if (expected.distinct) {
                        if (!actual || actual.toLowerCase() !== expected.distinct.toLowerCase()) {
                        return false;
                        }

                        return true;
                    }

                    //matchAny
                    if (expected.matchAny) {
                        if (expected.matchAny.all) {
                            return true;
                        }

                        if (!actual) {
                            return false;
                        }

                        for (var i = 0; i < expected.matchAny.items.length; i++) {
                            if (actual.toLowerCase() === expected.matchAny.items[i].toLowerCase()) {
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