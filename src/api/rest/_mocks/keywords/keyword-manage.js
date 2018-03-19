(function (server) {
    var activatedPromoted = JSON.stringify({ response: true });
    var deactivatedPromoted = JSON.stringify({ response: true });
    var activatedForced = JSON.stringify({ response: true });
    var activatedMonitored = JSON.stringify({ response: true });
    var deactivatedMonitored = JSON.stringify({ response: true });

    server.add("api/keyword/active-promoted", activatedPromoted, "GET", 200);
    server.add("api/keyword/deactive-promoted", deactivatedPromoted, "GET", 200);
    server.add("api/keyword/active-forced", activatedForced, "GET", 200);
    server.add("api/keyword/active-monitored", activatedMonitored, "GET", 200);
    server.add("api/keyword/deactive-monitored", deactivatedMonitored, "GET", 200);
})(window.mockServer);