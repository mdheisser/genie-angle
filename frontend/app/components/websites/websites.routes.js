(function (angular) {
    "use strict";
    angular
        .module("components.websites")
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
        $stateProvider
            .state("app.websites-dashboard", {
                url: "/websites-dashboard",
                templateUrl: helper.componentPath("websites/dashboard", "websites-dashboard"),
                resolve: helper.resolveFor("ng-bootstrap-select")
            })
            .state("app.websites-manage", {
                url: "/websites-manage",
                templateUrl: helper.componentPath("websites/manage", "websites"),
                resolve: helper.resolveFor(
                    "ng-bootstrap-select",
                    "smart-table",
                    "highcharts",
                    "highcharts-export",
                    "highcharts-ng"
                )
            })
            .state("app.websites-manage.best", {
                url: "/best"
            })
            .state("app.websites-manage.least", {
                url: "/least"
            })
            .state("app.website-new", {
                url: "/websites/new",
                title: "Add Website",
                templateUrl: helper.componentPath("websites/addwebsite", "add-site-wizard"),
                resolve: helper.resolveFor(
                    "modernizr",
                    "icons",
                    "md-steppers",
                    "ui.select",
                    "flag-icons",
                    "loaders.css",
                    'xeditable',
                    'spinkit',
                    'ng-bootstrap-select'
                ),
                controller: [
                    "$rootScope",
                    function ($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            });
    }
})(angular);