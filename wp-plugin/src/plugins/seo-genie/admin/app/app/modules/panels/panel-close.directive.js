/**=========================================================
 * Close panels * [panel-close]
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelClose', panelClose);

    function panelClose() {

        var directive = {
            controller: Controller,
            restrict: 'EA',
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element'];
    function Controller($scope, $element) {

        $element.on('click', function (e) {
            e.preventDefault();

            // find the first parent panel
            var parent = $(this).closest('side-accordion-item');

            removeElement();

            function removeElement() {
                parent.remove();
                $('.tooltip').remove();
            }
        });
    }
})();


