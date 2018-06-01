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
        // helper.componentPath("
        var base = "app/components/websites/templates/";

        $stateProvider
            .state("app.websites", {
                url: "/websites",
                templateUrl: base + "websites.html",
                resolve: helper.resolveFor("modernizr", "icons", "loaders.css"),
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
                templateUrl: base + "add-site-wizard.html",
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