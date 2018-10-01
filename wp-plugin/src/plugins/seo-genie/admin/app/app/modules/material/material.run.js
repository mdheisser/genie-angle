(function () {
  'use strict';
  // Used only for the BottomSheetExample
  angular
    .module('app.material')
    .run(materialRun);

  materialRun.$inject = ['$http', '$templateCache'];

  function materialRun($http, $templateCache) {
    var urls = [
      SEOgenie.pluginsUrl + 'admin/app/img/icons/share-arrow.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/upload.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/copy.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/print.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/hangout.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/mail.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/message.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/copy2.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/facebook.svg',
      SEOgenie.pluginsUrl + 'admin/app/img/icons/twitter.svg'
    ];

    angular.forEach(urls, function (url) {
      $http.get(url, {
        cache: $templateCache
      });
    });
  }
})();