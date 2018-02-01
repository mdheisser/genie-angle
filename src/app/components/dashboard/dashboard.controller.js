(function() {
    "use strict";

    angular
        .module("components.dashboard")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$scope", "$timeout"];

    function DashboardController($scope, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.toppings = [
                { category: "meat", name: "Pepperoni" },
                { category: "meat", name: "Sausage" },
                { category: "meat", name: "Ground Beef" },
                { category: "meat", name: "Bacon" },
                { category: "veg", name: "Mushrooms" },
                { category: "veg", name: "Onion" },
                { category: "veg", name: "Green Pepper" },
                { category: "veg", name: "Green Olives" }
            ];
            vm.selectedToppings = [];
            vm.printSelectedToppings = function() {
                var MAX_DISPLAYED = 2;
                var ITEMS_NAME = "Toppings";
                var numberOfToppings = this.selectedToppings.length;
                if (numberOfToppings > 1) {
                    if (numberOfToppings > MAX_DISPLAYED)
                        return numberOfToppings + " " + ITEMS_NAME + " selected";

                    var needsOxfordComma = numberOfToppings > 2;
                    var lastToppingConjunction = (needsOxfordComma ? "," : "") + " and ";
                    var lastTopping =
                        lastToppingConjunction +
                        this.selectedToppings[this.selectedToppings.length - 1];

                    return this.selectedToppings.slice(0, -1).join(", ") + lastTopping;
                }

                return this.selectedToppings.join("");
            };
        }
    }
})();