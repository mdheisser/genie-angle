(function (server) {
	var payload = [
		{keyword: 'Laurent', g: 11, y: 43, m: 102, category: {default: true, promoted:false, monitored: false, forced: true}, significance: 1, suitability: 2},
		{keyword: 'Blandine', g: 6, y: 5, m: 23, category: {default: true, promoted:true, monitored: true, forced: true}, significance: 2, suitability: 3},
		{keyword: 'Francoise', g: 3, y: 34, m: 423, category: {default: true, promoted:false, monitored: false, forced: true}, significance: 3, suitability: 4},
		{keyword: 'Laurent', g: 1, y: 43, m: 102, category: {default: true, promoted:true, monitored: true, forced: true}, significance: 4, suitability: 1},
		{keyword: 'Blandine', g: 23, y: 5, m: 23, category: {default: false, promoted:false, monitored: false, forced: true}, significance: 1, suitability: 2},
		{keyword: 'Francoise', g: 8, y: 34, m: 423, category: {default: true, promoted:true, monitored: true, forced: true}, significance: 2, suitability: 3},
		{keyword: 'Laurent', g: 2, y: 43, m: 102, category: {default: true, promoted:false, monitored: false, forced: true}, significance: 3, suitability: 4},
		{keyword: 'Blandine', g: 1, y: 5, m: 23, category: {default: true, promoted:true, monitored: true, forced: true}, significance: 4, suitability: 3},
		{keyword: 'Francoise', g: 34, y: 34, m: 423, category: {default: true, promoted:false, monitored: false, forced: true}, significance: 1, suitability: 3},
		{keyword: 'Laurent', g: 5, y: 43, m: 102, category: {default: false, promoted:true, monitored: true, forced: true}, significance: 2, suitability: 3},
		{keyword: 'Blandine', g: 2, y: 5, m: 23, category: {default: true, promoted:false, monitored: false, forced: true}, significance: 3, suitability: 1},
		{keyword: 'Francoise', g: 1, y: 34, m: 423, category: {default: true, promoted:true, monitored: true, forced: true}, significance: 4, suitability: 3},
		{keyword: 'Laurent', g: 12, y: 43, m: 102, category: {default: true, promoted:false, monitored: false, forced: true}, significance: 1, suitability: 3},
		{keyword: 'Blandine', g: 1, y: 5, m: 23, category: {default: true, promoted:true, monitored: true, forced: true}, significance: 2, suitability: 3},
		{keyword: 'Francoise', g: 14, y: 34, m: 423, category: {default: true, promoted:false, monitored: true, forced: true}, significance: 3, suitability: 2}
	];
	server.add("api/keywords", payload, "GET", 200);
})(window.mockServer);