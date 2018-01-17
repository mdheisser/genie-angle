(function () {
	"use strict";

	angular
		.module("components.pages")
		.controller("LoginFormController", LoginFormController);

	LoginFormController.$inject = ["$http", "$state"];

	function LoginFormController($http, $state) {
		var vm = this;

		activate();

		////////////////
		function activate() {
			// bind here all data from the form
			vm.account = {};
			// place the message if something goes wrong
			vm.authMsg = "";
			vm.login = function () {
				vm.authMsg = "";
				$http
					.post("api/account/login", {
						email: vm.account.email,
						password: vm.account.password
					})
					.then(
					function (response) {
						// assumes if ok, response is an object with some data, if not, a string with error
						// customize according to your api
						if (!response.data.account) {
							vm.authMsg = "Incorrect credentials.";
						} else {
							$state.go('app.dashoard');
						}
					},
					function () {
						vm.authMsg = "Server Request Error";
					}
					);
			};
		}
	}
})();