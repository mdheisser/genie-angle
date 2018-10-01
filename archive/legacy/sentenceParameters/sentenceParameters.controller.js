(function () {
	'use strict';
	var sentenceParametersController = function ($scope, $timeout, $resource, $q, $location, keywordsService, $mdDialog, focus, toastr) {
		var vm = this;

		var getTotal = function (prefixes, keywords, connectingWords, objects, connections, locations, serviceProviders) {
			var sentences = [];

			var prefixCount = prefixes.length;
			var keywordsCount = keywords.length;
			var connectingWordsCount = connectingWords.length;
			var objectsCount = objects.length;
			var connectionsCount = connections.length;
			var locationsCount = locations.length;
			var serviceProvidersCount = serviceProviders.length;

			var sentencesCount = _.max([prefixCount, keywordsCount, connectingWordsCount, objectsCount, connectionsCount, locationsCount, serviceProvidersCount]);
			for (var ind = 0; ind < sentencesCount; ind++) {
				var data = {
					prefix: prefixes[ind],
					keyword: keywords[ind],
					connectingWord: connectingWords[ind],
					object: objects[ind],
					connection: connections[ind],
					location: locations[ind],
					serviceProvider: serviceProviders[ind]
				};
				sentences.push(new Sentence(data));
			}
			return sentences;
		};


		$scope.gridsterOpts = {
			minRows: 2, // the minimum height of the grid, in rows
			maxRows: 10,
			columns: 6, // the width of the grid, in columns
			colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
			rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
			margins: [10, 10], // the pixel distance between each widget
			defaultSizeX: 2, // the default width of a gridster item, if not specifed
			defaultSizeY: 1, // the default height of a gridster item, if not specified
			mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
			pushing: true,
			floating: true,
			swapping: true,
			resizable: {
				enabled: true,
				start: function (event, uiWidget, $element) {
				}, // optional callback fired when resize is started,
				resize: function (event, uiWidget, $element) {
				}, // optional callback fired when item is resized,
				stop: function (event, uiWidget, $element) {
				} // optional callback fired when item is finished resizing
			},
			draggable: {
				enabled: true, // whether dragging items is supported
				handle: '.drag-handle', // optional selector for resize handle
				start: function (event, uiWidget, $element) {
				}, // optional callback fired when drag is started,
				drag: function (event, uiWidget, $element) {
				}, // optional callback fired when item is moved,
				stop: function (event, uiWidget, $element) {
				} // optional callback fired when item is finished dragging
			}
		};



		////////////////

		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: false,
			right: true
		};

		var init = function () {
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
			vm.termsListsWidgets = [];
			// Ajax
			vm.termsLists = [];
			//var keywordsPromise = $resource('server/sentencesData/keywords.json').query().$promise.then(function (keywords) {
			//	vm.keywords = keywords;
			//});

			var prefixesPromise = keywordsService.getTerms({ siteId: '1', type: TermTypes.prefix }).then(function (response) {
				console.log(response);
				vm.prefixes = response.data;
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			});

			var connectingWordsPromise = keywordsService.getTerms({ siteId: '1', type: TermTypes.connectionWord }).then(function (response) {
				vm.connectingWords = response.data;
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			});

			var objectsPromise = keywordsService.getTerms({ siteId: '1', type: TermTypes.objects }).then(function (response) {
				vm.objects = response.data;
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			});

			var locationRelatedPromise = keywordsService.getTerms({ siteId: '1', type: TermTypes.locationRelated }).then(function (response) {
				vm.locationRelated = response.data;
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			});

			var locationsPromise = keywordsService.getTerms({ siteId: '1', type: TermTypes.location }).then(function (response) {
				vm.locations = response.data;
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			});

			var serviceProvidersPromise = keywordsService.getTerms({ siteId: '1', type: TermTypes.by }).then(function (response) {
				vm.serviceProviders = response.data;
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			});


			$q.all([prefixesPromise, connectingWordsPromise, objectsPromise, locationRelatedPromise, locationsPromise, serviceProvidersPromise]).then(function () {
				vm.termsLists.push({
					title: 'Prefix', type: TermTypes.prefix, list: vm.prefixes, eg: 'best, advanced', sizeX: 1,
					sizeY: 3,
					minSizeX: 1,
					minSizeY: 1
				});
				vm.termsLists.push({
					title: 'Connecting Word', type: TermTypes.connectionWord, list: vm.connectingWords, eg: 'for, relating to', sizeX: 1,
					sizeY: 3,
					minSizeX: 1,
					minSizeY: 1
				});
				vm.termsLists.push({
					title: 'Object/Customer/Recipient', type: TermTypes.objects, list: vm.objects, eg: 'cats, tables', sizeX: 1,
					sizeY: 3,
					minSizeX: 1,
					minSizeY: 1
				});
				vm.termsLists.push({
					title: 'Location Related', type: TermTypes.locationRelated, list: vm.locationRelated, eg: 'in, near', sizeX: 1,
					sizeY: 3,
					minSizeX: 1,
					minSizeY: 1
				});
				vm.termsLists.push({
					title: 'Location', type: TermTypes.location, list: vm.locations, eg: 'London, Red Square', sizeX: 1,
					sizeY: 3,
					minSizeX: 1,
					minSizeY: 1
				});
				vm.termsLists.push({
					title: 'By', type: TermTypes.by, list: vm.serviceProviders, eg: 'Mr. Smith, Neo', sizeX: 1,
					sizeY: 3,
					minSizeX: 1,
					minSizeY: 1
				});

				_.each(vm.termsLists, function (item) {
					item.isAddMode = false;
				});
			});

			$scope.termsListOptions = {
				containment: '#sentenceParametersPanel .panel-body',
				//restrict move across columns. move only within column.
				//accept: function (sourceItemHandleScope, destSortableScope) {
				//	return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
				//}
			};



			var originatorEv;

			$scope.openMenu = function ($mdMenu, ev) {
				originatorEv = ev;
				$mdMenu.open(ev);
			};


		}
		init();

		$scope.$on('panel-refresh', function (event, id) {
			$timeout(function () {
				init();
				$scope.$broadcast('removeSpinner', id);
			}, 1000);
		});

		$scope.newTerm = '';

		$scope.showAddTerm = function (list) {
			list.isAddMode = true;
			vm.newTerm = '';
			focus('new-term-input-' + list.type);
		};

		$scope.isEmptyNewTerm = function () {
			return _.isUndefined(vm.newTerm) || _.isEmpty(vm.newTerm);
		}

		$scope.saveTerm = function ($kw) {
			if ($scope.isEmptyNewTerm()) return;

			var postData = {
				type: $kw.type,
				text: vm.newTerm
			};

			keywordsService.saveTerm(postData).then(function (response) {
				$kw.list.push({ id: response.data, text: vm.newTerm });
				$timeout(function () {
					$kw.isAddMode = false;
					vm.newTerm = '';
				}, 100);

			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t add sentence parameter', 'Error');
				}
				$kw.isAddMode = false;
				vm.newTerm = '';
			});
		}

		$scope.updateTerm = function (text, elem) {
			var postData = {
				id: angular.element(elem).data('term-id'),
				text: text
			};

			keywordsService.updateTerm(postData).then(function (response) {
				if (response.data) {
					console.log('term updated');
				}
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t update sentence parameter', 'Error');
				}
			});
		};

		$scope.selectTerm = function (term) {
			var postData = {
				id: term.id,
				selected: term.selected
			};

			keywordsService.selectTerm(postData).then(function (response) {
				if (response.data) {
					console.log('term updated');
				}
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t update sentence parameter', 'Error');
				}
			});
		};

		$scope.editTerm = function (term, $event) {
			$timeout(function () {
				angular.element('#' + term.id).triggerHandler('click');
			}, 0);
		};

		$scope.deleteTerm = function (list, term, $event) {
			var postData = {
				id: term.id
			};

			keywordsService.deleteTerm(postData).then(function (response) {
				if (response.data) {
					list.splice(list.indexOf(term), 1);
				}
			}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t delete sentence parameter', 'Error');
				}
			});
		};


		$scope.loadMore = function (list) {
			// load more
			console.log('load more');
		}
	}


	sentenceParametersController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'keywordsService', '$mdDialog', 'focus', 'toastr'];
	sentenceParametersApp.controller("sentenceParametersController", sentenceParametersController);
})();