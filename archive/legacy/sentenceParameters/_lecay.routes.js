// .state('app.pages', {
//         url: '/pages',
//         title: 'Pages',
//         templateUrl: helper.basepath('pages.html'),
//         resolve: helper.resolveFor('smart-table', 'flag-icons')
//     })
//     .state('app.sentenceParameters', {
//         url: '/sentenceParameters',
//         title: 'Sentence Parameters',
//         templateUrl: helper.basepath('sentenceParameters.html'),
//         resolve: helper.resolveFor('gridster', 'ng-sortable', 'busy-button', 'content-editable')
//     })
//     .state('app.sentenceGenerator', {
//         url: '/sentenceGenerator',
//         title: 'Sentence Generator',
//         templateUrl: helper.basepath('sentenceGenerator.html'),
//         resolve: helper.resolveFor('gridster', 'ng-sortable', 'busy-button')
//     })
//     //
//     // Material 
//     // ----------------------------------- 
//     .state('app.cards', {
//         url: '/cards',
//         title: 'Material Cards',
//         templateUrl: helper.basepath('material.cards.html')
//     })
//     .state('app.forms', {
//         url: '/forms',
//         title: 'Material Forms',
//         templateUrl: helper.basepath('material.forms.html')
//     })
//     .state('app.whiteframe', {
//         url: '/whiteframe',
//         title: 'Material Whiteframe',
//         templateUrl: helper.basepath('material.whiteframe.html')
//     })
//     .state('app.matcolors', {
//         url: '/matcolors',
//         title: 'Material Colors',
//         templateUrl: helper.basepath('material.colors.html')
//     })
//     .state('app.lists', {
//         url: '/lists',
//         title: 'Material Lists',
//         templateUrl: helper.basepath('material.lists.html')
//     })
//     .state('app.inputs', {
//         url: '/inputs',
//         title: 'Material Inputs',
//         templateUrl: helper.basepath('material.inputs.html')
//     })
//     .state('app.matwidgets', {
//         url: '/matwidgets',
//         title: 'Material Widgets',
//         templateUrl: helper.basepath('material.widgets.html'),
//         resolve: helper.resolveFor('weather-icons', 'loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
//     })
//     .state('app.ngmaterial', {
//         url: '/ngmaterial',
//         title: 'ngMaterial',
//         templateUrl: helper.basepath('material.ngmaterial.html')
//     })