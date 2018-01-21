 /**=========================================================
 * Directive: sideAccordion.directive.js
 * @desc horizontal accordion
 * @example <div side-accordion></div>
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.keywords')
        .directive('sideAccordion', sideAccordion);

    function sideAccordion() {
        var directive = {
            link: link,
            templateUrl: '/app/components/keywords/templates/sideAccordion.html',
            restrict: 'EA',
            transclude: true,
            scope: {},
            controller: ['$scope', accordionCtrl]
        };
        return directive;

        var wrapperWidth;

        function link(scope, element, attrs) {
            var wrapper = angular.element(element).children().first();
            wrapperWidth = wrapper.prop('offsetWidth');
        }

        function accordionCtrl($scope) {
            this.init = function(e) {
                initialize(e);
            };
        }

        function initialize(e) {
            var item = angular.element(e);
            var numberOfItem = item.parent().children().length;
            var collapseWidth = item.children().first().prop('offsetWidth') + 4;
            var panelContentWidth = wrapperWidth - collapseWidth * ( numberOfItem - 1 );
            // by default, fist panel is activated.
            var collapseHeader = item.parent().children().first();
            var iconTag = collapseHeader.children().children().children().first();
            collapseHeader.css('width', panelContentWidth + 'px');
            changeIcon(iconTag);
        }

        function changeIcon (tag) {
            tag.removeClass('fa-plus');
            tag.addClass('fa-minus');
        }
    }

})();