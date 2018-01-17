(function () {
	'use strict';
	var descriptorGeneratorController = function ($scope, $timeout, $resource, $q, $location, pagesService, keywordsService, sentencesService, $uibModal, Colors, $http) {
		var vm = this;

		$scope.loading = true;
		$scope.currentPage = 4;
		var init = function () {

			vm.totalItems = 64;


			vm.setPage = function (pageNo) {
				vm.currentPage = pageNo;
			};

			vm.pageChanged = function () {
				console.log('Page changed to: ' + vm.currentPage);
			};

			vm.maxSize = 5;
			vm.bigTotalItems = 175;
			vm.bigCurrentPage = 1;

			$scope.getInlineText = function (sentence) {
				//var result = _.pluck(sentence.terms, 'text').join(" ");
				var result = _.map(sentence.terms, function (term, key) {
					if (term.settings && term.settings.isKeyword) {
						return ' <u>' + term.text + '</u> ';
					}
					return term.text + ' ';
				});
				return result;
			};

			vm.sentences = [
				{
					id: 'qwty-er-sf',
					terms: [{ text: 'Find', settings: { cssClass: 'btn-default' } }, { text: 'effective herbal medicine', settings: { cssClass: 'btn-danger', isKeyword: true } }, { text: 'and', settings: { cssClass: 'btn-default' } }, { text: 'natural medicine', settings: { cssClass: 'btn-warning', isKeyword: true } },
						{ text: 'organic treatment', settings: { cssClass: 'btn-success', isKeyword: true } }, { text: 'in', settings: { cssClass: 'btn-default' } }, { text: 'London', settings: { cssClass: 'btn-default' } }
					],
					inlineEdit: false,
					active: false,
					inlineText: ''
				}, {
					id: 'asdkj-sdf-dsf-dsf-ds',
					terms: [{ text: 'Cheap' }, { text: 'natural medicine' }, { text: 'organic treatment' }, { text: 'and' },
					{ text: 'herbal medicine' }, { text: 'by' }, { text: 'experienced' }, { text: 'therapists' }],
					inlineEdit: false,
					active: false,
					inlineText: ''
				}
			];

			vm.wysiwygContent = '<p> Write something here.. </p>';
			$scope.editorOptions = {
				height: 60,
				focus: true,
				airmode: false,
				toolbar: []
			};


			angular.forEach(vm.sentences, function(s) {
				s.inlineText = $scope.getInlineText(s);
			});

			vm.pageKeywords = [];
			var postData = {
				siteId: 1,
				pageId: 1
			};
			pagesService.getPageKeywords(postData).then(function (response) {
				$scope.loading = false;
				console.log(response);
				vm.pageKeywords = angular.fromJson(response.data);
				_.each(vm.pageKeywords, function (item) {
				
					var suitableBarColor = '#2CC185';

					if ((item.suitability*100) <= 13) {
						suitableBarColor = "#dc3545";
					} 
					if ((item.suitability * 100) > 13 && (item.suitability * 100) < 33) {
						suitableBarColor = "#ffc107";
					} 
					if ((item.significance * 100) > 33 && (item.significance * 100) < 75) {
						suitableBarColor = "#28a745";
					}
					if ((item.suitability * 100) > 75) {
						suitableBarColor = "#17a2b8";
					} 


					item.suitablilityOptions = {
						trackWidth: 15,
						barWidth: 15,
						step: 1,
						trackColor: suitableBarColor,
						barColor: suitableBarColor,
						unit: '%',
						readOnly: true,
						size: 15,
						displayInput: false
					};

					var significanceBarColor = '#2CC185';

					if ((item.significance * 100) <= 13) {
						significanceBarColor = "#dc3545";
					}
					if ((item.significance * 100) > 13 && (item.significance * 100) < 33) {
						significanceBarColor = "#ffc107";
					}
					if ((item.significance * 100) > 33 && (item.significance * 100) < 75) {
						significanceBarColor = "#28a745";
					}
					if ((item.significance * 100) >75) {
						significanceBarColor = "#17a2b8";
					} 

					item.significanceOptions = {
						trackWidth: 15,
						barWidth: 15,
						step: 1,
						trackColor: significanceBarColor,
						barColor: significanceBarColor,
						unit: '%',
						readOnly: true,
						size: 15,
						displayInput: false
					};
				});

				//vm.displayedPageKeywords = angular.copy(vm.pageKeywords);
			});


		}

		$scope.tags = [
			{ keywordText: "effective herbal medicine", icon: "Brazil.png" },
			{ keywordText: "natural medicine", icon: "Italy.png" },
			{ keywordText: "organic treatment", icon: "Spain.png" }
		];

		$scope.loadKeywords = function ($query) {
			var postData = {
				siteId: 1,
				pageId: 1
			};
			return pagesService.getPageKeywords(postData).then(function(response) {
				var suggestedKeywords = angular.fromJson(response.data);
				console.log(response.data);
				return suggestedKeywords.filter(function (keyword) {
					return keyword.keywordText.toLowerCase().indexOf($query.toLowerCase()) != -1;
				});
			});
		};

		$scope.sortableOptions = {
			//containment: '#horizontal-container',
			//restrict move across columns. move only within column.
			accept: function (sourceItemHandleScope, destSortableScope) {
				return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
			}
		};

		$scope.input_data = [
			{ text: 'A', value: 'a', id: 1 },
			{ text: 'B', value: 'b', id: 2 },
			{ text: 'C', value: 'c', id: 3, checked: true },
			{ text: 'D', value: 'd', id: 4 },
			{ text: 'E', value: 'e', id: 5 },
			{ text: 'F', value: 'f', id: 6, checked: true }
		];

		$scope.output_data = [];

		$scope.webBrowsersGrouped = [
			{
				name: '<strong>All Browsers</strong>',
				msGroup: true
			},
			{
				name: '<strong>Modern Web Browsers</strong>',
				msGroup: true
			},
			{
				icon: '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32/opera.png" />',
				name: 'Opera',
				maker: '(Opera Software)',
				ticked: true
			},
			{
				icon: '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32/internet_explorer.png" />',
				name: 'Internet Explorer',
				maker: '(Microsoft)',
				ticked: false
			},
			{
				icon: '<img  src="https://cdn1.iconfinder.com/data/icons/humano2/32x32/apps/firefox-icon.png" />',
				name: 'Firefox',
				maker: '(Mozilla Foundation)',
				ticked: true
			},
			{
				icon: '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32x32/safari_browser.png" />',
				name: 'Safari',
				maker: '(Apple)',
				ticked: false
			},
			{
				icon: '<img  src="https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/32/chrome.png" />',
				name: 'Chrome',
				maker: '(Google)',
				ticked: true
			},
			{
				msGroup: false
			},
			{
				name: '<strong>Classic Web Browsers</strong>',
				msGroup: true
			},
			{
				icon: '<img  src="http://www.ucdmc.ucdavis.edu/apps/error/nojavascript/images/netscape_icon.jpg" />',
				name: 'Netscape Navigator',
				maker: '(Netscape Corporation)',
				ticked: true
			},
			{
				icon: '<img  src="http://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Amaya_logo_65x50.png/48px-Amaya_logo_65x50.png" />',
				name: 'Amaya',
				maker: '(Inria & W3C)',
				ticked: true
			},
			{
				icon: '<img  src="http://upload.wikimedia.org/wikipedia/commons/8/8c/WorldWideWeb_Icon.png" />',
				name: 'WorldWideWeb Nexus',
				maker: '(Tim Berners-Lee)',
				ticked: false
			},
			{
				msGroup: false
			},
			{
				msGroup: false
			}
		];

		init();

		$scope.selectSentence = function (sentence) {
			_.each(vm.sentences, function (s) {
				s.active = false;
				s.inlineEdit = false;
			});
			sentence.active = !sentence.active;
		};

		$scope.editSentence = function (sentence) {
			sentence.inlineEdit = !sentence.inlineEdit;
		};

		$scope.saveSentence = function(sentence) {
		//	sentence.inlineEdit = false;
			var postData = {
				siteId: '1',
				pageId: '1',
				sentence: {
					
				}
			};
			sentencesService.saveSentence(postData).then(function(response) {
				console.log(response);
			},
				function(errResponse) {
					console.log(errResponse);
				});
		};

		$scope.sentenceEdited = function(text, elem) {
			console.log(text);
			console.log(elem);
		};
	};

	descriptorGeneratorController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'pagesService', 'keywordsService', 'sentencesService', '$uibModal', 'Colors', '$http'];
	sentenceGeneratorApp.controller("descriptorGeneratorController", descriptorGeneratorController);
})();
