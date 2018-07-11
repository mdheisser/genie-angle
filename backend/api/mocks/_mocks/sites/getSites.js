(function (server) {
    var payload = [
        {_id: 1, name: 'www.umm.com', active: true, g: 4, y: 43, b: 102, date: '12/03/18', violations: [220, 350], keywords: [220, 350], pages: 220, sitemap: 1, health: 1},
        {_id: 2, name: 'www.uee.com', active: false, g: 6, y: 5, b: 23, date: '12/03/18', violations: [60, 80], keywords: [60, 80], pages: 60, sitemap: 2, health: 2},
        {_id: 3, name: 'www.uff.com', active: true, g: 3, y: 34, b: 423, date: '12/03/18', violations: [210, 250], keywords: [210, 250], pages: 2350, sitemap: 3, health: 3},
        {_id: 4, name: 'www.umme.com', active: true, g: 1, y: 43, b: 102, date: '12/03/18', violations: [670, 800], keywords: [670, 800], pages: 670, sitemap: 1, health: 1},
        {_id: 5, name: 'www.ueee.com', active: false, g: 23, y: 5, b: 23, date: '12/03/18', violations: [0, 55], keywords: [36, 55], pages: 36, sitemap: 2, health: 2},
        {_id: 6, name: 'www.uffe.com', active: true, g: 8, y: 43, b: 12, date: '12/03/18', violations: [620, 670], keywords: [670, 670], pages: 670, sitemap: 3, health: 3}
    ];
    server.add("api/sites", payload, "GET", 200);
})(window.mockServer);