(function (angular) {
    'use strict';

    angular
        .module('components.pages')
        .filter('convertWebsiteData', convertWebsiteData)

    convertWebsiteData.$inject = [];

    function convertWebsiteData() {

        return function (input) {
            var output = [];

            _.each(input, function(item) {

                if (item.active == true) {
                    item.websiteActive = 'active';
                } else {
                    item.websiteActive = 'deactive';
                }

                output.push(item);
            });

            return output;
        };
    }

})(angular);