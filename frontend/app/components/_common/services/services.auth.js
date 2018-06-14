(function (angular) {
    'use strict';

    angular
        .module('components.services')
        .factory('authService', authService);

    authService.$inject = ["REST"];

    function authService(REST) {

        var getUserToken = function (username, password) {
            var credential = {
                username: username,
                password: password
            }
            return REST.getUserToken({
                credential: credential
            });
        };

        var registerUser = function (username, password) {
            var credential = {
                username: username,
                password: password
            }
            return REST.registerUser({
                credential: credential
            });
        };

        var confirmRegister = function (username, code) {
            var confirmData = {
                username: username,
                code: code
            }
            return REST.confirmRegister({
                confirmData: confirmData
            });
        };

        return {
            getUserToken: getUserToken,
            registerUser: registerUser,
            confirmRegister: confirmRegister
        };
    }

})(angular);