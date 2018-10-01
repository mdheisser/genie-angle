/**=========================================================
 * Collapse panels to side * [panel-side-collapse]
 =========================================================*/
(function () {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelSideCollapse', panelSideCollapse);

    function panelSideCollapse() {
        var directive = {
            require: '^^sideAccordionItem',
            controller: Controller,
            restrict: 'EA',
            scope: false,
            link: link
        };
        return directive;
    }

    var parentCtrl;

    function link(scope, element, attrs, accordionCtrl) {
        parentCtrl = accordionCtrl;
    }

    Controller.$inject = ['$scope', '$element'];
    function Controller($scope, $element) {

        // Prepare the panel to be collapsible
        var $elem = $($element);

        // bind events to switch icons
        $element.bind('click', function (e) {
            e.preventDefault();
            onClick();

        });

        // Controller helpers
        function onClick() {
            parentCtrl.onCollapse(getFriend());
        }

        // get friend element
        function getFriend () {
            var friendElement = $elem.closest('side-accordion-item').next();
            if (typeof friendElement[0] !== 'undefined' && friendElement[0].tagName === 'SIDE-ACCORDION-ITEM') {
                return friendElement;
            } else {
                return $elem.closest('side-accordion-item').prev();
            }
        }
    }

})();
