(function (server) {
	var payload = [
		{keyword: 'Laurent', g: 12, y: 43, m: 102},
		{keyword: 'Blandine', g: 23, y: 5, m: 23},
		{keyword: 'Francoise', g: 34, y: 34, m: 423},
		{keyword: 'Laurent', g: 12, y: 43, m: 102},
		{keyword: 'Blandine', g: 23, y: 5, m: 23},
		{keyword: 'Francoise', g: 34, y: 34, m: 423},
		{keyword: 'Laurent', g: 12, y: 43, m: 102},
		{keyword: 'Blandine', g: 23, y: 5, m: 23},
		{keyword: 'Francoise', g: 34, y: 34, m: 423},
		{keyword: 'Laurent', g: 12, y: 43, m: 102},
		{keyword: 'Blandine', g: 23, y: 5, m: 23},
		{keyword: 'Francoise', g: 34, y: 34, m: 423},
		{keyword: 'Laurent', g: 12, y: 43, m: 102},
		{keyword: 'Blandine', g: 23, y: 5, m: 23},
		{keyword: 'Francoise', g: 34, y: 34, m: 423}
	];
	server.add("api/keywords", payload, "GET", 200);
})(window.mockServer);