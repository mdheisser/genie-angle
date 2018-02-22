(function (angular) {
    'use strict';

    angular
        .module('components.keywords')
        .directive('overlayPopup', overlayPopup);

    overlayPopup.$inject = ['$window', '$timeout'];

    function overlayPopup($window, $timeout) {
        var directive = {
            restrict: 'EA',
            templateUrl: '/app/components/keywords/manage/templates/overlayPopup.html',
            scope: {
                controls: '=',
                width: '@'
            },
            transclude: true,
            link: link
        };

        return directive;

        function link(scope, element) {
            scope.isActive = false;
            scope.opened = false;

            // Set popup screen's width if width option was set.
            if(scope.width) {
                element.css('width', scope.width + 'px');
            }

            // The function which open popup(callable from any controller).
            angular.extend(scope.controls, {
                show: function(){
                    scope.isActive = true;
                    $timeout(function() {
                        scope.opened = true;
                    }); 
                }
            });

            // Hide overlay popup when click even is happened outside of the element.
            var everywhere = angular.element(window.document);

            everywhere.bind('click', function(event){
                var isClickedElementChildOfPopup = element.find(event.target).length > 0;

                if (!isClickedElementChildOfPopup && scope.opened) {
                    scope.$apply(function(){
                        scope.isActive = false;
                        scope.opened = false;
                    });
                }
            });
        }
    }

})(angular);