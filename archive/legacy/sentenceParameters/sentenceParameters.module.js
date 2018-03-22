var sentenceParametersApp = angular.module('app.sentenceParameters', []);
sentenceParametersApp.config(function ($provide) {
	//Exception handling
	$provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
		return function (exception, cause) {
			$delegate(exception, cause);
		};
	}]);
});
