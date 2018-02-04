(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('sideAccordionItem', sideAccordionItem);

    sideAccordionItem.$inject = ['$window'];

    function sideAccordionItem($window) {
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
            angular.element($window).bind('resize', function () {
                accordionCtrl.response(element, isActive(element));
            });
        }

        function sideItemCtrl($scope) {

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

        function onSideCollapse(eventElement) {
            if (eventElement.hasClass('accordion-item')) { // prevent from clicking on sub elements
                var accordionItem = eventElement.parent();
                onClick(accordionItem);
            } else if (eventElement[0].tagName === 'EM') {
                var accordionItem = eventElement.closest('.accordion-item').parent();
                onClick(accordionItem);
            }
        }

        function onClick(accordionItem) {
            var accordionItems = accordionItem.parent().children();
            var collapseWidth = caculateContentWidth(accordionItems).collapse;
            var panelContentWidth = caculateContentWidth(accordionItems).content;

            var isActivated = isActive(accordionItem);
            var iconTag = accordionItem.children().children().children().first();

            if (isActivated) { // collapse if the panel is activated already
                onClick(getFriend(accordionItem));
            } else {
                angular.forEach(accordionItems, function (item) {
                    var pane = angular.element(item);
                    collapsePane(pane, collapseWidth);
                    changeIconToRight(pane.children().children().children().first());
                });
                expandPane(accordionItem, panelContentWidth);
                changeIconToLeft(accordionItem.children().children().children().first());
            }
        }

        function caculateContentWidth(e) {
            var wrapperWidth = e.parent().prop('offsetWidth');
            var numberOfItem = e.length;
            var collapseWidth = e.children().first().prop('offsetWidth');
            var panelContentWidth = wrapperWidth - collapseWidth * numberOfItem;
            return {
                collapse: collapseWidth,
                content: panelContentWidth
            };
        }

        function changeIconToRight(tag) {
            tag.removeClass('icon-arrow-left');
            tag.addClass('icon-arrow-right');
        }

        function changeIconToLeft(tag) {
            tag.removeClass('icon-arrow-right');
            tag.addClass('icon-arrow-left');
        }

        function isActive(e) {
            return e.children().children().children().first().hasClass('icon-arrow-left');
        }

        function collapsePane(pane, width) {
            pane.css('width', width + 'px');
            pane.children().last().addClass('smoothidden');
        }

        function expandPane(pane, width) {
            pane.css('width', width + 'px');
            pane.children().last().removeClass('smoothidden');
        }

        // get friend element
        function getFriend(e) {
            var friendElement = e.next();
            if (typeof friendElement[0] !== 'undefined' && friendElement[0].tagName === 'SIDE-ACCORDION-ITEM') {
                return friendElement;
            } else {
                return e.prev();
            }
        }
    }

})(angular);