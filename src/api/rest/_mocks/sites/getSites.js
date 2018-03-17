(function (server) {
    var payload = [
        {id: 1, name: 'www.umm.com'},
        {id: 2, name: 'www.uee.com'},
        {id: 3, name: 'www.uff.com'}
    ];
    server.add("api/sites", payload, "GET", 200);
})(window.mockServer);