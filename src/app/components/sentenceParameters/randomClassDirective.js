(function() {
	'use strict';
	var randomClass = angular.module('seogenie').directive("ngRandomClass",
		function() {
			return {
				restrict: 'EA',
				replace: false,
				scope: {
					ngClasses: "=ngRandomClass"
				},
				link: function(scope, elem, attr) {
					//Add random background class to selected element
					elem.addClass(scope.ngClasses[Math.floor(Math.random() * (scope.ngClasses.length))]);
				}
			}
		});
})();
