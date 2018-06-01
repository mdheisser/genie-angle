/**=========================================================
 * Module: access-register.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('components.generic')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$http', '$state', 'authService'];

    function RegisterFormController($http, $state, authService) {
        var vm = this;

        vm.account = {};
        vm.authMsg = '';
        vm.register = register;
        vm.showConfirmForm = false;
        vm.confirmCode = '';
        vm.confirm = confirm;

        activate();

        ////////////////

        function activate() {
            // 
        }

        // Register new user
        function register() {

            vm.authMsg = '';

            if (vm.registerForm.$valid) {
                authService
                    .registerUser(vm.account.email, vm.account.password)
                    .then(function (response) {
                        console.log('*** Register Response ***')
                        console.log(response.data);
                        if (!response.data.result.username) {
                            vm.authMsg = response.data.result.message;
                        } else {
                            vm.showConfirmForm = true;
                        }
                    }, function (err) {
                        vm.authMsg = "Server Request Error";
                    });
            } else {
                // set as dirty if the user click directly to login so we show the validation messages
                /*jshint -W106*/
                vm.registerForm.account_email.$dirty = true;
                vm.registerForm.account_password.$dirty = true;
                vm.registerForm.account_agreed.$dirty = true;
            }
        }

        // Confirm user with code
        function confirm() {
            authService
                .confirmRegister(vm.account.email, vm.confirmCode)
                .then(function (response) {
                    if (response.data.result == 'SUCCESS') {
                        $state.go('page.auth.login');
                    } else {
                        vm.authMsg = response.data.result.message;
                    }
                }, function (err) {
                    vm.authMsg = "Server Request Error";
                });
        }
    }
})();