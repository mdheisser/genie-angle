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
                "highcharts"
            )
        });
    }
})(angular);