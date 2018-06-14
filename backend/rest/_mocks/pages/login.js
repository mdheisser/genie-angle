(function (server) {
	var payload = {
		account: {
			jwtToken: "dsfgahaerwytefwrhgsadfwrasdgawdwrhs_dummy_tokn"
		}
	};
	server.add("api/account/login", payload, "POST", 200);
})(window.mockServer);