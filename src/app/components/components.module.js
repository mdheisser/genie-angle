// APP START
// -----------------------------------

(function() {
    "use strict";

    angular.module("app.components", [
        "components.dashboard",
        "components.websites",
        "components.generic",
        "components.keywords",
        "validation",
        "validation.rule"
    ]);
})();