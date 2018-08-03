(function() {
    "use strict";

    angular.module("components.dashboard").config(routesConfig);

    routesConfig.$inject = [
        "$stateProvider",
        "$locationProvider",
        "$urlRouterProvider",
        "RouteHelpersProvider"
    ];

    function routesConfig(
        $stateProvider,
        $locationProvider,
        $urlRouterProvider,
        helper
    ) {
        // Single Page Routes
        // -----------------------------------

        $stateProvider.state("app.dashoard", {
            url: "/dashboard",
            title: "Welcome",
            templateUrl: helper.componentPath("dashboard"),
            controller: "DashboardController as vm",
            data: {
                // Allow authenticated users
                roles: ['@']
            }
        });
    }
})();