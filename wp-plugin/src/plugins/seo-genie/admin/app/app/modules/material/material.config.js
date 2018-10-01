(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .config(materialConfig);
    materialConfig.$inject = ['$mdIconProvider', '$mdThemingProvider'];

    function materialConfig($mdIconProvider, $mdThemingProvider) {
        $mdIconProvider
            .icon('share-arrow', SEOgenie.pluginsUrl + 'admin/app/img/icons/share-arrow.svg', 24)
            .icon('upload', SEOgenie.pluginsUrl + 'admin/app/img/icons/upload.svg', 24)
            .icon('copy', SEOgenie.pluginsUrl + 'admin/app/img/icons/copy.svg', 24)
            .icon('print', SEOgenie.pluginsUrl + 'admin/app/img/icons/print.svg', 24)
            .icon('hangout', SEOgenie.pluginsUrl + 'admin/app/img/icons/hangout.svg', 24)
            .icon('mail', SEOgenie.pluginsUrl + 'admin/app/img/icons/mail.svg', 24)
            .icon('message', SEOgenie.pluginsUrl + 'admin/app/img/icons/message.svg', 24)
            .icon('copy2', SEOgenie.pluginsUrl + 'admin/app/img/icons/copy2.svg', 24)
            .icon('facebook', SEOgenie.pluginsUrl + 'admin/app/img/icons/facebook.svg', 24)
            .icon('twitter', SEOgenie.pluginsUrl + 'admin/app/img/icons/twitter.svg', 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('light-blue')
            .warnPalette('red');
        $mdThemingProvider.alwaysWatchTheme(true);
    }
})();