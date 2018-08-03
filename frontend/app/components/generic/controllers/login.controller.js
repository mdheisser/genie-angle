(function() {
    "use strict";

    angular
        .module("components.generic")
        .controller("LoginFormController", LoginFormController);

    LoginFormController.$inject = ["$http", "$state", "authService", "auth"];

    function LoginFormController($http, $state, authService, auth) {
        var vm = this;

        vm.login = login;
        vm.forgotPassword = forgotPassword;
        vm.confirmPassword = confirmPassword;
        vm.showConfirmPasswordForm = false;

        activate();

        ////////////////
        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = "";
        }

        // Authenticate user
        function login() {
            authService
                .getUserToken(vm.account.email, vm.account.password)
                .then(function (response) {
                    console.log('*** Login Response ***')
                    console.log(response.data);
                    var token = response.data.accessToken.jwtToken;
                    var user = {
                        name: 'Developer'
                    };
                    auth.login(token, user);
                    $state.go('app.dashoard');
                }, function (err) {
                    if (err.body.data.statusCode == 400) {
                        vm.authMsg = err.body.data.message;
                    } else {
                        vm.authMsg = "Server Request Error";
                    }
                });
        }

        // Forgot password
        function forgotPassword() {
            authService
                .forgotPassword(vm.login.account.email)
                .then(function (response) {
                    console.log('*** Forgot password Response ***');
                    console.log(response.data);
                    if (response.data == null) {
                        vm.showConfirmPasswordForm = true;
                    } else {
                        vm.authMsg = response.data.message;
                    }
                }, function (err) {
                    vm.authMsg = "Server Request Error";
                });
        }

        // Confirm password
        function confirmPassword() {
            authService
                .confirmPassword(vm.login.account.email, vm.verificationCode, vm.newPassword)
                .then(function (response) {
                    console.log('*** Forgot password Response ***')
                    console.log(response.data);
                    if (response.data.message == 'success') {
                        $state.go('page.auth.login');
                    } else {
                        vm.authMsg = response.data.message;
                    }
                }, function (err) {
                    vm.authMsg = "Server Request Error";
                });
        }
    }
})();