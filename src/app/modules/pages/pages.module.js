var pagesApp = angular.module('app.pages', []);
pagesApp.config(function ($provide) {
	//Exception handling
	$provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
		return function (exception, cause) {
			$delegate(exception, cause);
		};
	}]);
});
