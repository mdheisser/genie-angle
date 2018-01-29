var keywordsApp = angular.module('app.keywords', ["ui.bootstrap", "ngDialog", "ng-bootstrap-select"]);
keywordsApp.config(function ($provide) {
	//Exception handling
	$provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
		return function (exception, cause) {
			$delegate(exception, cause);
		};
	}]);
});
