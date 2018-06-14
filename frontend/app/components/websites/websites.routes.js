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
            .state("app.websites", {
                url: "/websites",
                templateUrl: helper.componentPath("websites/list", "websites"),
                resolve: helper.resolveFor("modernizr", "icons", "loaders.css", "ng-bootstrap-select", "smart-table"),
                controller: [
                    "$rootScope",
                    function ($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
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
                    'spinkit'
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