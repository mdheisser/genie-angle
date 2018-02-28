(function (server) {
	var payload = [
		{keyword: 'Laurent', g: 12, y: 43, m: 102, category: ['default', 'promoted']},
		{keyword: 'Blandine', g: 23, y: 5, m: 23, category: ['monitored']},
		{keyword: 'Francoise', g: 34, y: 34, m: 423, category: ['default', 'promoted']},
		{keyword: 'Laurent', g: 12, y: 43, m: 102, category: ['monitored']},
		{keyword: 'Blandine', g: 23, y: 5, m: 23, category: ['default', 'promoted']},
		{keyword: 'Francoise', g: 34, y: 34, m: 423, category: ['monitored']},
		{keyword: 'Laurent', g: 12, y: 43, m: 102, category: ['default', 'promoted']},
		{keyword: 'Blandine', g: 23, y: 5, m: 23, category: ['default', 'promoted']},
		{keyword: 'Francoise', g: 34, y: 34, m: 423, category: ['monitored']},
		{keyword: 'Laurent', g: 12, y: 43, m: 102, category: ['default', 'promoted']},
		{keyword: 'Blandine', g: 23, y: 5, m: 23, category: ['default', 'promoted']},
		{keyword: 'Francoise', g: 34, y: 34, m: 423, category: ['monitored']},
		{keyword: 'Laurent', g: 12, y: 43, m: 102, category: ['default', 'promoted']},
		{keyword: 'Blandine', g: 23, y: 5, m: 23, category: ['default', 'promoted']},
		{keyword: 'Francoise', g: 34, y: 34, m: 423, category: ['monitored']}
	];
	server.add("api/keywords", payload, "GET", 200);
})(window.mockServer);