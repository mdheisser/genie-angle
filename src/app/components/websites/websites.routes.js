(function(angular) {
    "use strict";

    angular.module("components.websites").config(routesConfig);

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
        var base = "app/components/websites/templates/";

        $stateProvider
            .state("app.websites", {
                url: "/websites",
                templateUrl: base + "websites.html",
                resolve: helper.resolveFor("modernizr", "icons", "loaders.css"),
                controller: [
                    "$rootScope",
                    function($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            })
            .state("app.websites_new", {
                url: "/websites/new",
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
                    function($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            })
            .state("app.eula", {
                url: "/end-user-software-license-agreement",
                templateUrl: "app/components/pages/templates/end-user-software-license-agreement.html",
                resolve: helper.resolveFor("modernizr", "icons"),
                controller: [
                    "$rootScope",
                    function($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            })
            .state("app.privacy-policy", {
                url: "/privacy-policy",
                templateUrl: "app/components/pages/templates/privacy-policy.html",
                resolve: helper.resolveFor("modernizr", "icons"),
                controller: [
                    "$rootScope",
                    function($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            });
    }
})(angular);