(function(server) {
    var RESPONSE_DELAY_MS = 2000;
    // Create a fake server to block AJAX requests
    if (!window.mockServer) {
        var fakeServer = sinon.fakeServer.create();
        fakeServer.configure({
            autoRespond: true,
            respondImmediately: false,
            autoRespondAfter: RESPONSE_DELAY_MS
        });

        fakeServer.xhr.useFilters = true;
        fakeServer.filteredUri = [];
        fakeServer.add = function(url, payload, method, httpCode, headers) {
            method = method || "GET";
            httpCode = httpCode || 200;
            headers = headers || { "Content-Type": "application/json" };
            var regex = new RegExp(url);

            if (typeof payload != "string") payload = JSON.stringify(payload);

            var response = [httpCode, headers, payload];
            fakeServer.respondWith(method, regex, response);
            fakeServer.filteredUri.push({ uri: regex, method: method.toUpperCase() });
        };

        fakeServer.xhr.addFilter(function(met, uri) {
            /**
             * Don't fake socket.io calls
             */
            if (new RegExp("browser-sync", "i").test(uri)) {
                return false;
            }
            var result = true;
            fakeServer.filteredUri.forEach(function(entry) {
                if (result)
                    result = !(uri.match(entry.uri) && entry.method == met.toUpperCase());
            });
            return result;
        });
        window.mockServer = fakeServer;
    }
})(window);