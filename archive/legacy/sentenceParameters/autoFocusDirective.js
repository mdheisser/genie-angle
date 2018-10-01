(function() {
	'use strict';
	angular
		.module('seogenie').directive('autoFocus',
			function($timeout) {
				return {
					restrict: 'AC',
					link: function(scope, element) {
						$timeout(function() {
								element[0].focus();
								element[0].click();
							},
							100);
					}
				};
			});

	angular
		.module('seogenie').factory('focus',
			function($timeout, $window) {
				return function(id) {

					// timeout makes sure that is invoked after any other event has been triggered.
					// e.g. click events that need to run before the focus or
					// inputs elements that are in a disabled state but are enabled when those events
					// are triggered.
					$timeout(function() {
							var element = $window.document.getElementById(id);
							if (element)
								element.focus();
								element.click();
						},
						200);
				};
			});

	angular
		.module('seogenie').directive('eventFocus',
			function(focus) {
				return function(scope, elem, attr) {
					elem.on(attr.eventFocus,
						function() {
							focus(attr.eventFocusId);
						});

					// Removes bound events in the element itself
					// when the scope is destroyed
					scope.$on('$destroy',
						function() {
							element.off(attr.eventFocus);
						});
				};
			});
})();