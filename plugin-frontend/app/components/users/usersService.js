(function () {
	'use strict';

	angular.module('seogenie').factory('usersService', ['$http', '$location', function ($http, $location) {
		var baseApiUrl = "/api/";

		var getCurrentUserInfo = function (userId, success, error) {
			var options = {
				url: baseApiUrl + 'Users/GetCurrentUserInfo',
				method: 'GET',
				header: { 'Content-Type': 'application/json; charset=UTF-8' }
			};

			return $http(options).then(success, error);
		};

		return {
			getCurrentUserInfo: getCurrentUserInfo
		};
	}]);
})();