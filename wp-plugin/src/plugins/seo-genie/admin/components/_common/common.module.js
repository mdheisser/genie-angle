(function (angular) {
    angular
        .module("components.common", ['validation.rule',
            'components.services',
            'components.directives',
            'components.filters'
        ]);
})(angular);