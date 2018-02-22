(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('sideAccordion', sideAccordion);

    sideAccordion.$inject = ['$window', '$timeout'];

    function sideAccordion($window, $timeout) {
        var directive = {
            link: link,
            templateUrl: '/app/components/keywords/common/templates/sideAccordion.html',
            restrict: 'EA',
            transclude: true,
            scope: {},
            bindToController: {
                activeTab: '=?'
            },
            controller: ['$scope', accordionCtrl],
            controllerAs: 'vm'
        };
        return directive;

        var wrapperWidth = 0;
        var wrapperElement = null;

        function link(scope, element, attrs) {
            wrapperElement = element;
            getWrapperWidth();
        }

        function accordionCtrl(scope) {
            var self = this;
            this.totalTabNumber = 1;

            this.init = function (e, childScope) {
                getWrapperWidth();
                initialize(e);
                childScope.tabNumber = this.totalTabNumber;
                this.totalTabNumber++;
            };

            this.setAsActive = function (value) {
                this.activeTab = value;
            };

            this.response = function (e, isActive) {
                getWrapperWidth();
                reRender(e, isActive);
            };

            function initialize(e) {
                var item = angular.element(e);
                var collapseWidth = item.children().first().prop('offsetWidth');
                var panelContentWidth = wrapperWidth - collapseWidth * self.totalTabNumber;

                var collapseHeader = item.parent().find('side-accordion-item:nth(' + (self.activeTab - 1) + ')');
                var iconTag = collapseHeader.children().children().children().first();
                collapseHeader.css('width', panelContentWidth + 'px');
                collapseHeader.children().last().removeClass('smoothidden');
                $timeout(function () {
                    var height = collapseHeader.children().last().prop('offsetHeight');
                    angular.forEach(item.parent().children(), function (value, key) {
                        angular.element(value).children().first().css('height', height + 'px');
                    });
                }, 1000);
            }

            function reRender(e, isActive) {
                var item = angular.element(e);
                var numberOfItem = item.parent().children().length;
                var collapseWidth = item.children().first().prop('clientWidth');
                var panelContentWidth = wrapperWidth - collapseWidth * numberOfItem;

                var iconTag = item.children().children().children().first();
                if (isActive === true) {
                    item.css('width', panelContentWidth + 'px');
                    item.children().last().removeClass('smoothidden');
                } else {
                    item.css('width', collapseWidth + 'px');
                    item.children().last().addClass('smoothidden');
                }
                $timeout(function () {
                    if (isActive) {
                        var height = item.children().last().prop('offsetHeight');
                        angular.forEach(item.parent().children(), function (value, key) {
                            angular.element(value).css('height', height + 'px');
                        });
                    }
                }, 500);
            }

            // Rerender element when scope value is changed.
            scope.$watch('vm.activeTab', function (newval, oldval) {
                var items = angular.element(wrapperElement).children().children()
                angular.forEach(items, function (value, key) {
                    var e = angular.element(value);
                    var active = false;
                    if (key == (newval - 1)) {
                        active = true;
                    }
                    reRender(e, active);
                });
            })
        }

        // Calculate the accordion wrapper's width.
        function getWrapperWidth() {
            var wrapper = angular.element(wrapperElement).children().first();
            wrapperWidth = wrapper.prop('clientWidth');
            if (hasScroll()) {
                wrapperWidth -= 17;
            }
        }

        // Check if browser has scroll.
        function hasScroll() {
            var body = document.body;
            return body.scrollHeight > body.clientHeight;
        }
    }

})(angular);