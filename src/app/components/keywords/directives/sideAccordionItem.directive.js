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
            scope: {
                controls: '='
            },
            transclude: true,
            controller: ['$scope', sideItemCtrl]
        };
        return directive;

        function link(scope, element, attrs, accordionCtrl) {
            accordionCtrl.init(element);
        }

        function sideItemCtrl ($scope) {

            $scope.active = function (e) {
                var eventElement = angular.element(e.target);
                onSideCollapse(eventElement);
            }

            this.close = function (e) {
                e.remove();
            }

            this.onCollapse = function (e) {
                var eventElement = e.children().first();
                onSideCollapse(eventElement);
            }
        }

        function onSideCollapse (eventElement) {
            if(eventElement.hasClass('accordion-item')) { // prevent from clicking on sub elements
                var accordionItem = eventElement.parent();
                onClick(accordionItem);
            } else if(eventElement.find('a')) {
                var accordionItem = eventElement.closest('side-accordion-item').children().first().parent();
                onClick(accordionItem);
            }
        }

        function onClick(accordionItem) {
            var accordionItems = accordionItem.parent().children();
            var collapseWidth = caculateContentWidth(accordionItems).collapse;
            var panelContentWidth = caculateContentWidth(accordionItems).content;

            var isActivated = isActive(accordionItem);
            var iconTag = accordionItem.children().children().children().first();

            if(isActivated) { // collapse if the panel is activated already
                changeIcon(iconTag);
                collapsePane(accordionItem, collapseWidth);
            } else {
                angular.forEach(accordionItems, function(item) {
                    var pane = angular.element(item);
                    collapsePane(pane, collapseWidth);
                    changeIcon(pane.children().children().children().first());
                });
                expandPane(accordionItem, panelContentWidth);
                accordionItem.children().children().children().first().addClass('fa-minus');
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

        function changeIcon (tag) {
            tag.removeClass('fa-minus');
            tag.addClass('fa-plus');
        }

        function isActive (e) {
            return e.children().children().children().first().hasClass('fa-minus');
        }

        function collapsePane (pane, width) {
            pane.css('width', width + 'px');
            pane.children().last().addClass('smoothidden');
        }

        function expandPane (pane, width) {
            pane.css('width', width + 'px');
            pane.children().last().removeClass('smoothidden');
        }
    }

})();