(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('sideAccordion', sideAccordion);

    sideAccordion.$inject = ['$window'];

    function sideAccordion($window) {
        var directive = {
            link: link,
            templateUrl: '/app/components/keywords/templates/sideAccordion.html',
            restrict: 'EA',
            transclude: true,
            scope: {},
            bindToController: {
                activeTab: '=?'
            },
            controller: ['$scope', accordionCtrl]
        };
        return directive;

        var wrapperWidth = 0;
        var wrapperElement = null;

        function link(scope, element, attrs) {
            wrapperElement = element;
            getWrapperWidth();
        }

        function accordionCtrl() {
            this.totalTabNumber = 1;

            this.init = function (e, childScope) {
                getWrapperWidth();
                initialize(e);
                childScope.tabNumber = this.totalTabNumber;
                this.totalTabNumber++;
            };

            this.setAsActive = function(value) {
                this.activeTab = value;
            };

            this.response = function (e, isActive) {
                getWrapperWidth();
                reRender(e, isActive);
            };
        }

        function initialize(e) {
            var item = angular.element(e);
            var numberOfItem = item.parent().children().length;
            var collapseWidth = item.children().first().prop('offsetWidth');
            var panelContentWidth = wrapperWidth - collapseWidth * numberOfItem;
            // by default, fist panel is activated.
            var collapseHeader = item.parent().children().first();
            var iconTag = collapseHeader.children().children().children().first();
            collapseHeader.css('width', panelContentWidth + 'px');
            changeIcon(iconTag);
        }

        function reRender(e, isActive) {
            var item = angular.element(e);
            var numberOfItem = item.parent().children().length;
            var collapseWidth = item.children().first().prop('clientWidth');
            var panelContentWidth = wrapperWidth - collapseWidth * numberOfItem;

            var iconTag = item.children().children().children().first();
            if (isActive === true) {
                item.css('width', panelContentWidth + 'px');
                changeIcon(iconTag);
            } else {
                item.css('width', collapseWidth + 'px');
            }
        }

        function changeIcon(tag) {
            if (tag.hasClass('icon-arrow-right')) {
                tag.removeClass('icon-arrow-right');
                tag.addClass('icon-arrow-left');
            }
        }

        function getWrapperWidth() {
            var wrapper = angular.element(wrapperElement).children().first();
            wrapperWidth = wrapper.prop('clientWidth');
            if (hasScroll()) {
                wrapperWidth -= 17;
            }
        }

        function hasScroll() {
            var body = document.body;
            return body.scrollHeight > body.clientHeight;
        }
    }

})(angular);