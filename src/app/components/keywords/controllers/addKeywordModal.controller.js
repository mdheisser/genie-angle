(function () {
	'use strict';
	var addKeywordModalController = function ($scope, $timeout, $resource, $q, $location, pagesService, keywordsService, $uibModal, sitesService) {
		var vm = this;
		$scope.loading = true;

		$scope.enterModes = [
			{
				value: 'freeText',
				label: 'Free Text Mode'
			},
			{
				value: 'tabular',
				label: 'Tabular Mode'
			}
		];


		var init = function() {
			$scope.currentSite = sitesService.getCurrentSite();
			$scope.loading = false;

			$scope.promotion = 282;
			$scope.totalPromotion = 803;

			$scope.monitoring = 296;
			$scope.totalMonitoring = 810;

			$scope.keywordsInputText = '';
			$scope.keywordsInput = [];
		};

		init();
	
		$scope.cancelAddKeywords = function () {
			cancelAddKeywords();
		};
			
		function cancelAddKeywords() {
			$scope.addKeywordsModal.dismiss('cancel');
		}

		$scope.isEmptyKeywordsInput = function() {
			return _.isEmpty($scope.keywordsInputText);
		};

		$scope.clearInput = function() {
			$scope.keywordsInput = [];
			$scope.keywordsInputText = '';
		};

		$scope.getKeywordsFromText = function() {
			$scope.keywordsInput = $scope.keywordsInputText.replace(/\r\n/g, "\n").split("\n");
			console.log($scope.keywordsInput);
		};

		$scope.addKeywords = function () {
			var postData = {
				siteId: $scope.currentSite.siteId,
				keywords: $scope.keywordsInput
			};
			keywordsService.addKeywords(postData, function(response) {
				console.log(response);
			}, function(errResponse) {});
		};
	};

	addKeywordModalController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'pagesService', 'keywordsService', '$uibModal', 'sitesService'];
	 angular         .module('components.keywords').controller("addKeywordModalController", addKeywordModalController);
})();
