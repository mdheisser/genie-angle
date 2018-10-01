var sentenceGeneratorApp = angular.module('app.sentenceGenerator', []);
sentenceGeneratorApp.config(function ($provide) {
	//Exception handling
	$provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
		return function (exception, cause) {
			$delegate(exception, cause);
		};
	}]);
});
