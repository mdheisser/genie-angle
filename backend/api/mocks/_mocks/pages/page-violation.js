(function (server) {
    var payload = [
        {id: 1, status: 2, category: 'Performance', description: 'The length of the text Google is too long and may not be indexed...', action: 'Shorten text to 66 characters...'},
        {id: 2, status: 2, category: 'Performance', description: 'The length of the text Google is too long and may not be indexed...', action: 'Shorten text to 66 characters...'},
        {id: 3, status: 2, category: 'SEO', description: 'The length of the text Google sued over...', action: 'Shorten text to 66 characters...'},
        {id: 4, status: 2, category: 'SEO', description: 'The length of the text Google sued over...', action: 'Shorten text to 66 characters...'},
        {id: 5, status: 1, category: 'Content', description: 'SiteMap missing...', action: 'Creat sitemap...'},
        {id: 6, status: 2, category: 'Performance', description: 'The length of the text Google sued over...', action: 'Shorten text to 66 characters...'},
        {id: 7, status: 3, category: 'Performance', description: 'The length of the text Google sued over...', action: 'Shorten text to 66 characters...'},
        {id: 8, status: 4, category: 'SEO', description: 'Missing title and description...', action: 'Added...'}
    ];
    server.add("/api/page/1/violation", payload, "GET", 200);
})(window.mockServer);