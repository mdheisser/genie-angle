angular
	.module("components.websites").directive('uiSelectRequired', function () {
		return {
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {

					if (attr.uiSelectRequired) {
						var isRequired = scope.$eval(attr.uiSelectRequired);
						if (isRequired == false)
							return true;
					}
					var determineVal;
					if (angular.isArray(modelValue)) {
						determineVal = modelValue;
					} else if (angular.isArray(viewValue)) {
						determineVal = viewValue;
					} else {
						return false;
					}

					var isReq = determineVal.length > 0;
					return isReq;
				};
			}
		};
	});


angular
	.module("components.websites").directive('uiRequired', function () {
		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {
				ctrl.$validators.required = function (modelValue, viewValue) {
					return !((viewValue && viewValue.length === 0 || false) && attrs.uiRequired === 'true');
				};

				attrs.$observe('uiRequired', function () {
					ctrl.$setValidity('required', !(attrs.uiRequired === 'true' && ctrl.$viewValue && ctrl.$viewValue.length === 0));
				});
			}
		};
	});