(function (server) {
	var payload = [{
			"id": "21654c6d-3b5c-4973-bd9f-e057fab4d082",
			"text": "effective",
			"type": "prefix",
			"selected": "false"
		},
		{
			"id": "7cfed528-7734-407a-8b71-ab2401b0563a",
			"text": "advanced",
			"type": "prefix",
			"selected": "false"
		}

	];
	server.add("/api/Keywords/GetTerms", payload, "GET", 200);
	server.add("/api/Keywords/AddTerm", payload, "POST", 200);
})(window.mockServer);