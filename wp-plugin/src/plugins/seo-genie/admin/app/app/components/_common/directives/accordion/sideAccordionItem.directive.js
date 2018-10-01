(function (angular) {
    'use strict';

    angular
        .module('components.directives')
        .directive('sideAccordionItem', sideAccordionItem);

    sideAccordionItem.$inject = ['$window', '$timeout'];

    function sideAccordionItem($window, $timeout) {
        var directive = {
            require: '^^sideAccordion',
            link: link,
            templateUrl: '/app/components/_common/directives/accordion/sideAccordionItem.html',
            restrict: 'EA',
            scope: {
                name: '@',
                href: '@'
            },
            transclude: true
        };
        return directive;

        function link(scope, element, attrs, accordionCtrl) {
            // Load accordion items.
            accordionCtrl.init(element, scope);

            // Redraw the accordion when the window is resized.
            angular.element($window).bind('resize', function () {
                accordionCtrl.response(element, scope.isActive());
            });

            // Rerender accordion when element's content is changed.
            scope.$watch(function () {
                return element.html();
            }, function () {
                accordionCtrl.response(element, scope.isActive());
            });

            // Change collapse status icon when collapse status is changed.
            scope.$watch(function () {
                return accordionCtrl.activeTab;
            }, function () {
                var iconTag = element.find('em.collapse-icon');
                var tab = element.children();
                if (scope.tabNumber === accordionCtrl.activeTab) {
                    setTabActive(iconTag, tab);
                } else {
                    setTabNotActive(iconTag, tab);
                }
            });

            // Check if the panel is opened.
            scope.isActive = function () {
                return scope.tabNumber === accordionCtrl.activeTab;
            }

            // Collapse the panel.
            scope.active = function (e) {
                var eventElement = angular.element(e.target);
                var accordionItem = null;

                // Convert the children elements's click event to accordion-item element's one.
                if (eventElement.hasClass('accordion-item')) {
                    accordionItem = eventElement.parent();
                } else if (eventElement[0].tagName === 'EM' || eventElement.hasClass('rotated-text') || eventElement[0].tagName === 'SPAN' || eventElement.hasClass('collapsed-body')) {
                    accordionItem = eventElement.closest('.accordion-item').parent();
                }

                // Activate the friend element if target element was activated already.
                if (scope.isActive()) {
                    onClick(getFriend(accordionItem));
                    if (checkLastElement(accordionItem)) {
                        accordionCtrl.setAsActive(scope.tabNumber - 1);
                    } else {
                        accordionCtrl.setAsActive(scope.tabNumber + 1);
                    }
                } else {
                    onClick(accordionItem);
                    accordionCtrl.setAsActive(scope.tabNumber);
                }
                $timeout(function () {
                    var height = accordionItem[0].querySelector('.panel').clientHeight;
                    accordionItem.parent().css('height', height + 'px');
                }, 1000);
            }

            function onClick(accordionItem) {
                var accordionItems = accordionItem.parent().children();
                var collapseWidth = caculateContentWidth(accordionItems).collapse;
                var panelContentWidth = caculateContentWidth(accordionItems).content;
                var iconTag = accordionItem.children().children().children().first();

                angular.forEach(accordionItems, function (item) {
                    var pane = angular.element(item);
                    collapsePane(pane, collapseWidth);
                });
                expandPane(accordionItem, panelContentWidth);
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

            function setTabNotActive(iconTag, tabTag) {
                iconTag.addClass('fa-grip');
                tabTag.removeClass('accordion-item-active');
            }

            function setTabActive(iconTag, tabTag) {
                iconTag.removeClass('fa-grip');
                tabTag.addClass('accordion-item-active');
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
                if (checkLastElement(e)) {
                    return e.prev();
                } else {
                    return e.next();
                }
            }

            // Check if target element is last one.
            function checkLastElement(e) {
                if (e == null)
                    return false;
                var friendElement = e.next();
                if (typeof friendElement[0] !== 'undefined' && friendElement[0].tagName === 'SIDE-ACCORDION-ITEM') {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

})(angular);