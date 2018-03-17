(function (server) {
    var activatedPromoted = JSON.stringify({ response: true });
    var deactivatedPromoted = JSON.stringify({ response: true });

    server.add("api/keyword/active-promoted", activatedPromoted, "GET", 200);
    server.add("api/keyword/deactive-promoted", deactivatedPromoted, "GET", 200);
})(window.mockServer);