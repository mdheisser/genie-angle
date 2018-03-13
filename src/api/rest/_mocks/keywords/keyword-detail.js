(function (server) {
    var payload = [
        {id: 1, pageUrl: 'http://www.umm.edu/health/medical/altmed/treatment/herbal-medicine', keywords: 5, category: {default: false, promoted:true, monitored: true, forced: false}, violate: 1, assignedState: true},
        {id: 2, pageUrl: 'http://www.umm.edu/health/medical/altmed/treatment1', keywords: 4, category: {default: true, promoted:true, monitored: true, forced: true}, violate: 2, assignedState: true},
        {id: 3, pageUrl: 'http://www.umm.edu/health/medical/altmed/treatment/wwww', keywords: 4, category: {default: true, promoted:false, monitored: false, forced: false}, violate: 2, assignedState: true},
        {id: 4, pageUrl: 'http://www.umm.edu/health/medical/altmed/treatment/d', keywords: 4, category: {default: false, promoted:true, monitored: true, forced: true}, violate: 3, assignedState: true},
        {id: 5, pageUrl: 'http://www.umm.edu/health/medical/altmed/treatment/122', keywords: 4, category: {default: false, promoted:false, monitored: false, forced: false}, violate: 1, assignedState: false},
        {id: 6, pageUrl: 'http://www.umm.edu/health/medical/altmed/d', keywords: 4, category: {default: true, promoted:true, monitored: true, forced: true}, violate: 1, assignedState: false},
        {id: 7, pageUrl: 'http://www.umm.edu/login', keywords: 0, category: {default: false, promoted:false, monitored: false, forced: false}, violate: 1, assignedState: false},
        {id: 8, pageUrl: 'http://www.umm.edu/health/medical/altmed/treatment/herbal-medicine', keywords: 1, category: {default: true, promoted:true, monitored: true, forced: true}, violate: 1, assignedState: false}
    ];
    server.add("api/keyword-detail", payload, "GET", 200);
})(window.mockServer);