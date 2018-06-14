(function (server) {
    var status = JSON.stringify({ response: true });

    server.add("api/keyword/active-default", status, "GET", 200);
    server.add("api/keyword/deactive-default", status, "GET", 200);
    server.add("api/keyword/active-forced", status, "GET", 200);
    server.add("api/keyword/deactive-forced", status, "GET", 200);
    server.add("api/keyword/active-promoted", status, "GET", 200);
    server.add("api/keyword/deactive-promoted", status, "GET", 200);
    server.add("api/keyword/active-monitored", status, "GET", 200);
    server.add("api/keyword/deactive-monitored", status, "GET", 200);
})(window.mockServer);