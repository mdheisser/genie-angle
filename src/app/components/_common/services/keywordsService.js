(function (angular) {
    'use strict';

    angular.module('seogenie').factory('keywordsService', ['$http', '$location', function ($http, $location) {
        var baseApiUrl = 'http://localhost:779' + '/api/';
        //var baseApiUrl = "/api/";

        var getKeywords = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/GetKeywords',
                method: 'GET',
                params: data
            };

            return $http(options).then(success, error);
        };

        var addKeywords = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/AddKeywords',
                method: 'POST',
                data: JSON.stringify(data)
            };

            return $http(options).then(success, error);
        };

        var getCategories = function (siteId) {
            var options = {
                url: baseApiUrl + 'Keywords/GetKeywords?siteId=' + siteId,
                method: 'GET',
                header: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };

            return $http(options);
        };

        var saveTerm = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/AddTerm',
                method: 'POST',
                data: JSON.stringify(data)
            };

            return $http(options).then(success, error);
        };


        var updateTerm = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/UpdateTerm',
                method: 'POST',
                data: JSON.stringify(data)
            };

            return $http(options).then(success, error);
        };

        var selectTerm = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/SelectTerm',
                method: 'POST',
                data: JSON.stringify(data)
            };

            return $http(options).then(success, error);
        };

        var deleteTerm = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/DeleteTerm',
                method: 'POST',
                data: JSON.stringify(data)
            };

            return $http(options).then(success, error);
        };

        var getTerms = function (data, success, error) {
            $http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
            var options = {
                url: baseApiUrl + 'Keywords/GetTerms',
                method: 'GET',
                params: data
            };

            return $http(options).then(success, error);
        };

        return {
            getKeywords: getKeywords,
            addKeywords: addKeywords,
            getCategories: getCategories,
            saveTerm: saveTerm,
            getTerms: getTerms,
            updateTerm: updateTerm,
            selectTerm: selectTerm,
            deleteTerm: deleteTerm
        };
    }]);
})(angular);