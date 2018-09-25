(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('websitesService', websitesService);

        websitesService.$inject = ['$http', '$location'];

        function websitesService($http, $location) {
            var baseApiUrl = 'http://localhost' + '/api/';
            //var baseApiUrl = "/api/";

            var getLanguages = function (onReady, onError) {
                //  var langJson = 'server/languages.json';
                var langJson = 'server/supported-languages.json';
                var langUrl = langJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: langUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            var getSiteTypes = function (onReady, onError) {
                var siteTypesJson = 'server/site-types.json';
                var siteTypesUrl = siteTypesJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: siteTypesUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            var getCountries = function (onReady, onError) {
                var countriesJson = 'server/countries.json';
                var countriesUrl = countriesJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: countriesUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            var getGoogleDomains = function (onReady, onError) {
                var googleDomainJson = 'server/googleEngine.json';
                var googleDomainUrl = googleDomainJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: googleDomainUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            var getYahooDomains = function (onReady, onError) {
                var yahooDomainJson = 'server/yahooEngine.json';
                var yahooDomainUrl = yahooDomainJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: yahooDomainUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            var getBingDomains = function (onReady, onError) {
                var bingDomainJson = 'server/bingEngine.json';
                var bingDomainUrl = bingDomainJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: bingDomainUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            var getYandexDomains = function (onReady, onError) {
                var yandexDomainJson = 'server/yandexEngine.json';
                var yandexDomainUrl = yandexDomainJson + '?v=' + (new Date().getTime()); // jumps cache

                var options = {
                    url: yandexDomainUrl,
                    method: 'GET'
                };

                return $http(options).then(onReady, onError);
            };

            return {
                getLanguages: getLanguages,
                getSiteTypes: getSiteTypes,
                getCountries: getCountries,
                getGoogleDomains: getGoogleDomains,
                getYahooDomains: getYahooDomains,
                getBingDomains: getBingDomains,
                getYandexDomains: getYandexDomains
            };
        };
})(angular);