(function () {
	'use strict';
	angular.module('seogenie')
		.factory('sentencesService', ['$http', '$location', function ($http, $location) {
			var baseApiUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/api/';

			var getSentences = function (data) {
				var options = {
					url: baseApiUrl + 'Sentences/GetSentences',
					method: 'GET',
					data: data
				};

				return $http(options);
			};


			var saveSentence = function (postData, success, error) {
				$http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
				var options = {
					url: baseApiUrl + 'Sentences/Save',
					method: 'POST',
					data: JSON.stringify(postData),

				};

				return $http(options).then(success, error);
			};

			return {
				getSentences: getSentences,
				saveSentence: saveSentence
			};
		}]);
})();