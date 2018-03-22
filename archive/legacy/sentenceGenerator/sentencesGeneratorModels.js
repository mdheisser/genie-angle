var Sentence = function (data) {
	var prefix = data.prefix;
	var keyword = data.keyword;
	var connectingWord = data.connectingWord;
	var object = data.object;
	var connection = data.connection;
	var location = data.location;
	var serviceProvider = data.serviceProvider;

	return {
		prefix: prefix,
		keyword: keyword,
		connectingWord: connectingWord,
		object: object,
		connection: connection,
		location: location,
		serviceProvider: serviceProvider
	};
};

var TermTypes = {
	prefix: 'Prefix',
	solution: 'SolutionProductService',
	keywords: 'SolutionProductService',
	connectionWord: 'ConnectionWord',
	objects: 'ObjectCustomerRecipient',
	locationRelated: 'LocationRelated',
	location: 'Location',
	by: 'By'
};
Object.freeze(TermTypes);
