(function (server) {

	var users = [
		{
			id: "54D8C03E-61DC-400D-A0C7-008F2EE4813F",
			firstName: "John",
			lastName: "Lennon",
			email: "johnlennon@mail.com",
			lastActivityDate: "",
			dateCreated: "",
			city: "Liverpool",
			countryId: "12",
			phoneNumber: '9546798798',
			company: 'Apple'
		},
		{
			id: "5asdE-6zDC-4sad-Aasd-0sadas4813F",
			firstName: "Paul",
			lastName: "McCartney",
			email: "McCartney@mail.com",
			lastActivityDate: "",
			dateCreated: "",
			city: "London",
			countryId: "12",
			phoneNumber: '2346798798',
			company: 'Beatles'
		},
		{
			id: "5sdfa-sdfzDC-4sad-Aasd-0sadas4813F",
			firstName: "George",
			lastName: "Harrison",
			email: "harrison@mail.com",
			lastActivityDate: "",
			dateCreated: "",
			city: "New York",
			countryId: "13",
			phoneNumber: '2364876234876',
			company: 'Moon Records'
		},
		{
			id: "s25sdfa-sdfzDC-4234sad-Asdfasd-0ssdfsdf",
			firstName: "Ringo",
			lastName: "Starr",
			email: "starr@mail.com",
			lastActivityDate: "",
			dateCreated: "",
			city: "Edinburgh",
			countryId: "13",
			phoneNumber: '3488876234876',
			company: 'Sun Records'
		}
	];

	var currentUser = users[0];

	server.add("api/users/userInfo", currentUser, "GET", 200);
})(window.mockServer);