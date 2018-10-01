(function() {
	'use strict';
	angular
		.module('seogenie').directive('iframeOnload',
			[
				function() {
					return {
						scope: {
							callBack: '&iframeOnload'
						},
						link: function(scope, element, attrs) {
							element.on('load',
								function() {
									return scope.callBack();
								});
						}
					}
				}
			])
})();