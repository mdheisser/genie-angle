(function (angular) {
    "use strict";
    angular.module("components.keywords", [
            "ui.bootstrap",
            'components.services'
        ])
        .config(function ($provide) {
            //Exception handling
            $provide.decorator("$exceptionHandler", [
                "$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        $delegate(exception, cause);
                    };
                }
            ]);
        });
})(angular);