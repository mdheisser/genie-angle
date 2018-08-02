(function() {
    "use strict";

    angular
        .module("components.generic")
        .controller("LoginFormController", LoginFormController);

    LoginFormController.$inject = ["$http", "$state", "authService"];

    function LoginFormController($http, $state, authService) {
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
            console.log(vm.login.account.email);
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
            console.log(vm.login.account.email);
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