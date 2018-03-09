(function () {
	angular
		.module('validation.rule', ['validation'/*, 'validation.schema'*/])
		.config(['$validationProvider', function ($validationProvider/*, validationSchemaProvider*/) {
			var expression = {
				required: function (value) {
					return !!value;
				},
				url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
				email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
				number: /^\d+$/,
				minlength: function (value, scope, element, attrs, param) {
					return value && value.length >= param;
				},
				maxlength: function (value, scope, element, attrs, param) {
					return !value || value.length <= param;
				},
				urlProtocolOptional: function (value) {
					// https://stackoverflow.com/questions/26093545/how-to-validate-domain-name-using-regex
					return value.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/)!=null;
				},
				selectOption: function(value) {
					return !!value;
				},
				text: function (value) {
					return value.match(/[^a-zA-Z]/) == null ;
				}
			};

			var defaultMsg = {
				required: {
					error: 'This is required'
				},
				url: {
					error: 'Type valid Url'
				},
				email: {
					error: 'Type valid Email'
				},
				number: {
					error: 'Type valid Number'
				},
				minlength: {
					error: 'Type longer text'
				},
				maxlength: {
					error: 'Type shorter text'
				},
				urlProtocolOptional: {
					error: 'Type valid Url'
				},
				selectOption: {
					error: 'Select option'
				},
				text: {
					error: 'Remove illegal characters'
				}
			};
			$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
			$validationProvider.setErrorHTML(function (msg) {
				var spacer = "<div class='validation-spacer'> </div>";
				var message = "<div class=\"validation-text\">" + spacer + msg + "</div>";
				return message;
			});
			$validationProvider.addMsgElement = function (element) {
				var target = $(element).parent();
				target
					.append('<div class="validation-message"></div>');
			};
			$validationProvider.getMsgElement = function (element) {
				return $(element).parent().children().last();
			};
			$validationProvider.showSuccessMessage = false; // or true(default)`      
			$validationProvider.setValidMethod('submit');
		}]);
}).call(this);