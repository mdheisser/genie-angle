(function() {
    "use strict";

    angular
        .module("components.generic")
        .controller("LoginFormController", LoginFormController);

    LoginFormController.$inject = ["$http", "$state", "authService"];

    function LoginFormController($http, $state, authService) {
        var vm = this;

        activate();

        ////////////////
        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = "";
            vm.login = function() {
                $state.go('app.dashoard');
                authService
                    .getUserToken(vm.account.email, vm.account.password)
                    .then(function (response) {
                        console.log('*** Login Response ***')
                        console.log(response.data);
                        if (!response.data.result.accessToken) {
                            vm.authMsg = "Incorrect credentials.";
                        } else {
                            $state.go('app.dashoard');
                        }
                    }, function (err) {
                        vm.authMsg = "Server Request Error";
                    });
            };
        }
    }
})();