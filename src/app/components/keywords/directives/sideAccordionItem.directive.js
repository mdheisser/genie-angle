 /**=========================================================
 * Directive: sideAccordionItem.directive.js
 * @desc horizontal accordion item
 * @example <div side-accordion-item></div>
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.keywords')
        .directive('sideAccordionItem', sideAccordionItem);

    function sideAccordionItem() {
        var directive = {
            require: '^^sideAccordion',
            link: link,
            templateUrl: '/app/components/keywords/templates/sideAccordionItem.html',
            restrict: 'EA',
            scope: {},
            transclude: true,
            controller: ['$scope', sideItemCtrl]
        };
        return directive;

        function link(scope, element, attrs, accordionCtrl) {
            accordionCtrl.init(element);
        }

        function sideItemCtrl ($scope) {
            $scope.active = function (e) {
                // active only a panel
                var accordionItems = angular.element(e.target).parent().parent().children();
                var collapseWidth = caculateContentWidth(accordionItems).collapse;
                var panelContentWidth = caculateContentWidth(accordionItems).content;
                angular.forEach(accordionItems, function(item) {
                    angular.element(item).css('width', collapseWidth + 'px');
                });
                angular.element(e.target).parent().css('width', panelContentWidth + 'px');
            }
        }

        function caculateContentWidth (e) {
            var wrapperWidth = e.parent().prop('clientWidth');
            var numberOfItem = e.length;
            var collapseWidth = e.children().first().prop('clientWidth') + 4;
            var panelContentWidth = wrapperWidth - collapseWidth * ( numberOfItem - 1 );
            return {
                collapse : collapseWidth,
                content: panelContentWidth
            };
        }
    }

})();