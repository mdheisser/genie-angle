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

                item.date = new Date(item.date).toLocaleDateString("en-US");

                item.keyword_min = 1;
                item.keyword_max = 7;
                output.push(item);
            });

            return output;
        };
    }

})(angular);