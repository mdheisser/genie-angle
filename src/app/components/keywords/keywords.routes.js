(function (angular) {
    "use strict";

    angular
        .module("components.keywords")
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
        $stateProvider.state("app.keywords-dashboard", {
            url: "/keywords-dashboard",
            title: "Keywords Dashboard",
            templateUrl: helper.componentPath("keywords/dashboard", "keywords-dashboard"),
            resolve: helper.resolveFor(
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords-manage", {
            url: "/keywords-manage",
            title: "Keywords Manage",
            templateUrl: helper.componentPath("keywords/manage", "keywords-list"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        });
    }
})(angular);