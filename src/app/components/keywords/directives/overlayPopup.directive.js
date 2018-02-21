(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('overlayPopup', overlayPopup);

    overlayPopup.$inject = ['$window', '$timeout'];

    function overlayPopup($window, $timeout) {
        var directive = {
            restrict: 'EA',
            templateUrl: '/app/components/keywords/templates/overlayPopup.html',
            scope: {
                active: '=',
                width: '@'
            },
            transclude: true,
            link: link
        };

        return directive;

        function link(scope, element) {
            scope.isActive = false;

            if(scope.width) {
                element.css('width', scope.width + 'px');
            }

            scope.$watch('active', function() {
                if (scope.active == true) {
                    scope.isActive = true;
                    $timeout(bindClick);
                } else {
                    scope.isActive = false;
                    unbindClick();
                }
            })

            // Hide overlay popup when click even is happened outside of the element.
            function bindClick() {
                var everywhere = angular.element(window.document);
            
                everywhere.bind('click', function(event){
                    var isClickedElementChildOfPopup = element.find(event.target).length > 0;

                    if (!isClickedElementChildOfPopup) {
                        scope.$apply(function(){
                            scope.active = false;
                            unbindClick();
                        });
                    }
                });
            }

            function unbindClick() {
                var everywhere = angular.element(window.document);            
                everywhere.unbind('click');
            }
        }
    }

})(angular);