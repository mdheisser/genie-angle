(function (server) {

	var falseCheckedSite = JSON.stringify({ 'response': 'false' });
	var trueCheckedSite = JSON.stringify({ 'response': 'true' });
	var addNewSite = {
		keywords: ["herbal", "herbal medicine", "wisdom"]
	};
	server.add("api/sites/checkSite", falseCheckedSite, "GET", 200);
	server.add("api/sites/addnew", addNewSite, "POST", 200);
})(window.mockServer);