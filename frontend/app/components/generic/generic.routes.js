/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

(function () {
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
                templateUrl: helper.componentPath("generic", "page"),
                resolve: helper.resolveFor("modernizr", "icons"),
                controller: [
                    "$rootScope",
                    function ($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            })
            .state("page.auth", {
                title: "auth",
                templateUrl: helper.componentPath("generic", "auth")
            })
            .state("page.auth.login", {
                url: "/login",
                title: "SEOgenie - Login",
                templateUrl: helper.componentPath("generic", "login"),
                controller: "LoginFormController as vm"
            })
            .state("page.auth.register", {
                url: "/register",
                title: "SEOgenie - Register",
                templateUrl: helper.componentPath("generic", "register"),
                controller: "RegisterFormController as regCtrl"
            })
            .state("page.auth.recover", {
                url: "/recover",
                title: "Recover",
                templateUrl: helper.componentPath("generic", "recover")
            })
            .state("page.lock", {
                url: "/lock",
                title: "Lock",
                templateUrl: helper.componentPath("generic", "lock")
            })
            .state("page.404", {
                url: "/404",
                title: "Not Found",
                templateUrl: helper.componentPath("generic", "404")
            })
            .state("page.500", {
                url: "/500",
                title: "Server error",
                templateUrl: helper.componentPath("generic", "500")
            })
            .state("page.maintenance", {
                url: "/maintenance",
                title: "Maintenance",
                templateUrl: helper.componentPath("generic", "maintenance")
            }).state("app.eula", {
                url: "/end-user-software-license-agreement",
                templateUrl: "app/components/pages/templates/end-user-software-license-agreement.html",
                resolve: helper.resolveFor("modernizr", "icons"),
                controller: [
                    "$rootScope",
                    function ($rootScope) {
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
                    function ($rootScope) {
                        $rootScope.app.layout.isBoxed = false;
                    }
                ]
            });;
    }
})();