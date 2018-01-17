(function () {
	'use strict';
	angular.module('seogenie').factory('pagesService', ['$http', '$location', function ($http, $location) {
		var baseApiUrl = "/api";

		var getPages = function (siteId) {
			var options = {
				url: baseApiUrl + '/Page/GetPages?siteId=' + siteId,
				method: 'GET',
				header: { 'Content-Type': 'application/json; charset=UTF-8' }
			};

			return $http(options);
		};

		var getPageKeywords = function (data) {
			var options = {
				url: baseApiUrl + '/Page/GetPageKeywords?siteId=' + data.siteId+'&pageId='+data.pageId,
				method: 'GET',
				header: { 'Content-Type': 'application/json; charset=UTF-8' }
			};

			return $http(options);
		};

		return {
			getPages: getPages,
			getPageKeywords: getPageKeywords
		};
	}]);
})();