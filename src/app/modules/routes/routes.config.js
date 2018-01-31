/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');

        //$locationProvider.html5Mode({
        //	enabled: true,
        //	requireBase: true

        //});
        $locationProvider.hashPrefix('');
        // defaults to dashboard
        //$urlRouterProvider.otherwise('/app');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('modernizr', 'icons', 'toastr', 'fastclick')
            })
            .state('app.pages', {
                url: '/pages',
                title: 'Pages',
                templateUrl: helper.basepath('pages.html'),
                resolve: helper.resolveFor('smart-table', 'flag-icons')
            })
            .state('app.keywords', {
                url: '/keywords',
                title: 'Keywords',
                templateUrl: helper.basepath('keywords.html'),
                resolve: helper.resolveFor('smart-table', 'ui.select', 'ng-dialog', 'ng-bootstrap-select')
            })
            .state('app.sentenceParameters', {
                url: '/sentenceParameters',
                title: 'Sentence Parameters',
                templateUrl: helper.basepath('sentenceParameters.html'),
                resolve: helper.resolveFor('gridster', 'ng-sortable', 'busy-button', 'content-editable')
            })
            .state('app.sentenceGenerator', {
                url: '/sentenceGenerator',
                title: 'Sentence Generator',
                templateUrl: helper.basepath('sentenceGenerator.html'),
                resolve: helper.resolveFor('gridster', 'ng-sortable', 'busy-button')
            })
            //
            // Material 
            // ----------------------------------- 
            .state('app.cards', {
                url: '/cards',
                title: 'Material Cards',
                templateUrl: helper.basepath('material.cards.html')
            })
            .state('app.forms', {
                url: '/forms',
                title: 'Material Forms',
                templateUrl: helper.basepath('material.forms.html')
            })
            .state('app.whiteframe', {
                url: '/whiteframe',
                title: 'Material Whiteframe',
                templateUrl: helper.basepath('material.whiteframe.html')
            })
            .state('app.matcolors', {
                url: '/matcolors',
                title: 'Material Colors',
                templateUrl: helper.basepath('material.colors.html')
            })
            .state('app.lists', {
                url: '/lists',
                title: 'Material Lists',
                templateUrl: helper.basepath('material.lists.html')
            })
            .state('app.inputs', {
                url: '/inputs',
                title: 'Material Inputs',
                templateUrl: helper.basepath('material.inputs.html')
            })
            .state('app.matwidgets', {
                url: '/matwidgets',
                title: 'Material Widgets',
                templateUrl: helper.basepath('material.widgets.html'),
                resolve: helper.resolveFor('weather-icons', 'loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
            })
            .state('app.ngmaterial', {
                url: '/ngmaterial',
                title: 'ngMaterial',
                templateUrl: helper.basepath('material.ngmaterial.html')
            })
            // 
            // CUSTOM RESOLVES
            //   Add your own resolves properties
            //   following this object extend
            //   method
            // ----------------------------------- 
            // .state('app.someroute', {
            //   url: '/some_url',
            //   templateUrl: 'path_to_template.html',
            //   controller: 'someController',
            //   resolve: angular.extend(
            //     helper.resolveFor(), {
            //     // YOUR RESOLVES GO HERE
            //     }
            //   )
            // })
        ;

    } // routesConfig

})();