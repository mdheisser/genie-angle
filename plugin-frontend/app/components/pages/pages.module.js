(function (angular) {
    "use strict";
    angular.module("components.pages", [
            "ui.bootstrap",
            'components.common'
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