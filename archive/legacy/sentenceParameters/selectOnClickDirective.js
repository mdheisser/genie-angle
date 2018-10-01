angular.module('seogenie').directive('selectOnClick', function () {
	'use strict';

	return {
		restrict: 'A',
		scope: {
			selectOnClick: '='
		},
		link: function (scope, element, attrs, ctrl) {
			element.on('focus click', function () {
				var domElement = element[0];
				if (scope.selectOnClick &&
					angular.isFunction(domElement.setSelectionRange)) {
					domElement.setSelectionRange(0, domElement.value.length);
				}
			});
		}
	};
});
