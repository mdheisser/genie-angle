(function (angular) {
    'use strict';

    angular
        .module('components.directives')
        .directive('overlayPopup', overlayPopup);

    overlayPopup.$inject = ['$window', '$timeout'];

    function overlayPopup($window, $timeout) {
        var directive = {
            restrict: 'EA',
            templateUrl: SEOgenie.app_dist + '/app/components/_common/directives/grid/overlayPopup.html',
            scope: {
                width: '@',
                active: '='
            },
            transclude: true,
            link: link
        };

        return directive;

        function link(scope, element) {
            scope.visible = false;
            scope.opened = false;

            // Set popup screen's width if width option was set.
            if(scope.width) {
                element.css('width', scope.width + 'px');
            }

            // Show/Hide popup in accordance with scope value.
            scope.$watch('active', function() {
                if (scope.active) {
                    scope.visible = true;
                    $timeout(function() {
                        scope.opened = true;
                    })
                } else {
                    scope.visible = false;
                    scope.opened = false;
                }
            });

            // Hide overlay popup when click even is happened outside of the element.
            var everywhere = angular.element(window.document);

            everywhere.bind('click', function(event){
                var isClickedElementChildOfPopup = element.find(event.target).length > 0;

                if (!isClickedElementChildOfPopup && scope.opened) {
                    scope.$apply(function(){
                        scope.active = false;
                        scope.opened = false;
                    });
                }
            });
        }
    }

})(angular);