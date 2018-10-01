(function () {
    'use strict';

    angular
        .module('components.keywords')
        .controller('keywordPageInfoController', keywordPageInfoController)

    keywordPageInfoController.$inject = [
        '$scope', '$mdDialog', '$window',
        'websitesService', 'pageData', 'Notify'];

    function keywordPageInfoController(
        $scope, $mdDialog, $window,
        websitesService, pageData, Notify) {
        /* jshint validthis:true */
        var vm = this;

        vm.cancel = cancel;
        vm.hide = hide;
        vm.pageData = {};
        vm.openPageUrl = openPageUrl;
        vm.copyToClipboard = copyToClipboard;
        vm.onRefreshPage = onRefreshPage;
        vm.onRemoveFromSystem = onRemoveFromSystem;
        vm.selectedLanguage = [];

        activate();

        //////////////

        function activate() {
            vm.pageData = pageData;
            getLanguages();
        }

        function hide() {
          $mdDialog.hide();
        };

        function cancel() {
          $mdDialog.cancel();
        };

        // Gey available languages.
        function getLanguages(siteId) {
            websitesService
                .getLanguages(siteId)
                .then(function (response) {
                    vm.languages = response.data;
                    vm.selectedLanguage.push(vm.languages[1]);
                });
        }

        // Search selected page on new tab.
        function openPageUrl(event) {
            $window.open(pageData.pageUrl, '_blank');
            event.stopPropagation();
        }

        // Save keyword to clipbaord
        function copyToClipboard(el) {
            var text = pageData.pageUrl;
            var copyTest = document.queryCommandSupported('copy');
            var msgHtml = 'Copied the keyword to clipboard!';

            if (copyTest === true) {
                var copyTextArea = document.createElement("textarea");
                copyTextArea.value = text;
                document.body.appendChild(copyTextArea);
                copyTextArea.select();
                try {
                    var successful = document.execCommand('copy');
                } catch (err) {
                    console.log('Oops, unable to copy');
                }
                document.body.removeChild(copyTextArea);
            } else {
                // Fallback if browser doesn't support .execCommand('copy')
                window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
            }

            msgHtml = 'Copied the page url to clipboard!';

            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );

            el.stopPropagation();
        }

        // Refresh, process page from system
        function onRefreshPage() {
            var msgHtml = 'Refreshed page.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }

        // Remove page from system
        function onRemoveFromSystem() {
            var msgHtml = 'Removed page from system.' + '<a style="text-decoration:none;float:right;"><strong>UNDO</strong></a>';
            Notify.alert(
                msgHtml,
                {status: 'success', pos: 'top-center'}
            );
        }
    }

})();