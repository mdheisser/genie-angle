/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

(function() {
    "use strict";

    angular.module("components.generic").config(routesConfig);

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
        $stateProvider
            .state("page", {
                url: "/page",
                templateUrl: helper.componentPath("pages", "page"),
                resolve: helper.resolveFor("modernizr", "icons"),
                controller: [
                    "$rootScope",
                    function($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            })
            .state("page.auth", {
                title: "auth",
                templateUrl: helper.componentPath("pages", "auth")
            })
            .state("page.auth.login", {
                url: "/login",
                title: "SEOgenie - Login",
                templateUrl: helper.componentPath("pages", "login"),
                controller: "LoginFormController as vm"
            })
            .state("page.auth.register", {
                url: "/register",
                title: "SEOgenie - Register",
                templateUrl: helper.componentPath("pages", "register"),
                controller: "RegisterFormController as vm"
            })
            .state("page.auth.recover", {
                url: "/recover",
                title: "Recover",
                templateUrl: helper.componentPath("pages", "recover")
            })
            .state("page.lock", {
                url: "/lock",
                title: "Lock",
                templateUrl: helper.componentPath("pages", "lock")
            })
            .state("page.404", {
                url: "/404",
                title: "Not Found",
                templateUrl: helper.componentPath("pages", "404")
            })
            .state("page.500", {
                url: "/500",
                title: "Server error",
                templateUrl: helper.componentPath("pages", "500")
            })
            .state("page.maintenance", {
                url: "/maintenance",
                title: "Maintenance",
                templateUrl: helper.componentPath("pages", "maintenance")
            });
    }
})();