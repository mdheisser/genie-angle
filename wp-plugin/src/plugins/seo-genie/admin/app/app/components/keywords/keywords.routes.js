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
                "highcharts-export",
                "highcharts-ng"
            ),
            data: {
                // Allow authenticated users
                roles: ['@']
            }
        })
        .state("app.keywords-dashboard.statistics", {
            url: "/statistics"
        })
        .state("app.keywords-dashboard.engines", {
            url: "/engines"
        })
        .state("app.keywords-dashboard.ranking", {
            url: "/ranking"
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
                "highcharts-export",
                "highcharts-ng"
            ),
            data: {
                // Allow authenticated users
                // roles: ['@']
            }
        })
        .state("app.keywords-manage.filter", {
            url: "/filter"
        })
        .state("app.keywords-manage.best", {
            url: "/best"
        })
        .state("app.keywords-manage.least", {
            url: "/least"
        })
        .state("app.keywords-manage.default", {
            url: "/default"
        })
        .state("app.keywords-add", {
            url: "/keywords-add",
            title: "Add Keywords",
            templateUrl: helper.componentPath("keywords/addkeyword", "add-keywords"),
            resolve: helper.resolveFor(
                "ng-bootstrap-select"
            ),
            data: {
                // Allow authenticated users
                roles: ['@']
            }
        });
    }
})(angular);