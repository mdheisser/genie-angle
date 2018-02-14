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
        $stateProvider.state("app.keywords", {
            url: "/keywords",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords.dashboard", {
            url: "/dashboard",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords.dashboard.statistics", {
            url: "/statistics",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords.dashboard.engines", {
            url: "/engines",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords.dashboard.ranking", {
            url: "/ranking",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords.list", {
            url: "/list",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        })
        .state("app.keywords.add-keywords", {
            url: "/add-keywords",
            title: "Keywords",
            templateUrl: helper.basepath("keywords.html"),
            resolve: helper.resolveFor(
                "smart-table",
                "ui.select",
                "ng-dialog",
                "ng-bootstrap-select",
                "highcharts",
                "highcharts-export"
            )
        });
    }
})(angular);