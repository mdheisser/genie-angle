(function(angular) {
    "use strict";

    angular
        .module("components.generic")
        .controller("AuthController", LoginFormController);

    LoginFormController.$inject = ["$state","users"];

    function LoginFormController($state) {
        var vm = this;

        activate();

        ////////////////
        function randomBg() {
            var lowerBound = 1,
                upperBound = 5;

            var randomNumber = Math.round(
                Math.random() * (upperBound - lowerBound) + lowerBound
            );
            return "bg-" + randomNumber;
        }

        function activate() {
            vm.bgImage = randomBg();
        }
    }
})(angular);