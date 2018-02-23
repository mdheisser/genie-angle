(function (server) {
	var payload = [
		{
			"siteId": "1",
			"pageId": "268dbafe-4fc5-4984-9867-03a3a34cedc4",
			"url": [
				"http://example.com/home",
				"http://example.com/index",
				"http://example.com"
			],
			"isDeleted": false,
			"isPromoted": true,
			"isAutoKeywords": true,
			"collectionName": "Pages",
			"name": "Home",
			"promotedKeywordsCount": 2
		},
		{
			"siteId": "1",
			"pageId": "268dbafe-4fc5-4984-9867-03a3a34cedc4",
			"url": [
				"http://example.com/home",
				"http://example.com/index",
				"http://example.com"
			],
			"isDeleted": false,
			"isPromoted": true,
			"isAutoKeywords": true,
			"collectionName": "Pages",
			"name": "Home",
			"promotedKeywordsCount": 2
		},
		{
			"siteId": "1",
			"pageId": "268dbafe-4fc5-4984-9867-03a3a34cedc4",
			"url": [
				"http://example.com/home",
				"http://example.com/index",
				"http://example.com"
			],
			"isDeleted": false,
			"isPromoted": true,
			"isAutoKeywords": true,
			"collectionName": "Pages",
			"name": "Home",
			"promotedKeywordsCount": 3
		},
		{
			"siteId": "1",
			"pageId": "268dbafe-4fc5-4984-9867-03a3a34cedc4",
			"url": [
				"http://example.com/home",
				"http://example.com/index",
				"http://example.com"
			],
			"isDeleted": false,
			"isPromoted": true,
			"isAutoKeywords": true,
			"collectionName": "Pages",
			"name": "Home",
			"promotedKeywordsCount": 1
		}
	];
	server.add("/api/Page/GetPages", payload, "GET", 200);
})(window.mockServer);