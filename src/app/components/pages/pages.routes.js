(function (angular) {
    "use strict";

    angular
        .module("components.pages")
        .config(routesConfig);

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
        $stateProvider.state("app.pages", {
            url: "/pages",
            title: "Pages",
            templateUrl: helper.componentPath("pages", "pages"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-bootstrap-select"
            )
        })
        .state("app.pages.dashboard", {
            url: "/dashboard"
        })
        .state("app.pages.manage", {
            url: "/manage",
            params: {
                filter: null
            }
        });
    }
})(angular);