var keywordsController = function ($scope, $timeout, $resource, $q, $location, keywordsService, $uibModal, toastr) {
	var vm = this;
	$scope.loading = true;


	$scope.currentSite = {
		siteId: "1",
		name: "SEOgenie"
	};

	//var generatePageRow = function () {
	//	var pages = [];
	//};

	//$scope.totalItems = 64;
	//$scope.currentPage = 4;

	//$scope.setPage = function (pageNo) {
	//	$scope.currentPage = pageNo;
	//};

	//$scope.pageChanged = function () {
	//	console.log('Page changed to: ' + vm.currentPage);
	//};

	//$scope.maxSize = 5;
	//$scope.bigTotalItems = 175;
	//$scope.bigCurrentPage = 1;

	$scope.initKnobs = function (pageList) {
	//	_.each(pageList, function (item) {

	//		var suitableBarColor = '#2CC185';

	//		if ((item.suitability * 100) <= 13) {
	//			suitableBarColor = "#dc3545";
	//		}
	//		if ((item.suitability * 100) > 13 && (item.suitability * 100) < 33) {
	//			suitableBarColor = "#ffc107";
	//		}
	//		if ((item.significance * 100) > 33 && (item.significance * 100) < 75) {
	//			suitableBarColor = "#28a745";
	//		}
	//		if ((item.suitability * 100) > 75) {
	//			suitableBarColor = "#17a2b8";
	//		}


	//		item.suitablilityOptions = {
	//			trackWidth: 15,
	//			barWidth: 15,
	//			step: 1,
	//			trackColor: suitableBarColor,
	//			barColor: suitableBarColor,
	//			unit: '%',
	//			readOnly: true,
	//			size: 15,
	//			displayInput: false
	//		};

	//		var significanceBarColor = '#2CC185';

	//		if ((item.significance * 100) <= 13) {
	//			significanceBarColor = "#dc3545";
	//		}
	//		if ((item.significance * 100) > 13 && (item.significance * 100) < 33) {
	//			significanceBarColor = "#ffc107";
	//		}
	//		if ((item.significance * 100) > 33 && (item.significance * 100) < 75) {
	//			significanceBarColor = "#28a745";
	//		}
	//		if ((item.significance * 100) > 75) {
	//			significanceBarColor = "#17a2b8";
	//		}

	//		item.significanceOptions = {
	//			trackWidth: 15,
	//			barWidth: 15,
	//			step: 1,
	//			trackColor: significanceBarColor,
	//			barColor: significanceBarColor,
	//			unit: '%',
	//			readOnly: true,
	//			size: 15,
	//			displayInput: false
	//		};
	//	});
	};


	var init = function () {
		// Ajax
		vm.keywords = [];
		
		
		var postData = {
			siteId: "1"
		}

		keywordsService.getKeywords(postData).then(function (response) {
			$scope.loading = false;
				console.log(response);
			if (response.data) {
				vm.keywords = angular.fromJson(response.data);
				console.log(vm.keywords);
			} else {
				// No data
			}


			//$scope.initKnobs(vm.pages);
		}, function (errResponse) {
				if (errResponse && errResponse.data && errResponse.data.Message) {
					toastr.error('Can\'t retrieve data', 'Error');
				}
			}
		);


		$scope.$on('panel-refresh', function (event, id) {
			var secs = 3;
			console.log('Refreshing during ' + secs + 's #' + id);
			$timeout(function () {
				// directive listen for to remove the spinner 
				// after we end up to perform own operations
				$scope.$broadcast('removeSpinner', id);

				console.log('Refreshed #' + id);

		}, 3000);

		});
	};

	init();


	$scope.refreshGrid = function () {
		vm.pages = [];
		$scope.loading = true;
		keywordsService.getKeywords(1).then(function (response) {
			$scope.loading = false;
			vm.pages = response.data;
		});
	};

	$scope.addKeywordsOpenDialog = function () {
		var modalDialog = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			//appendTo: 'body',
			resolve: {
				items: function () {
					//return $akm.items;
				}
			},
			templateUrl: function (element, attrs) {
				return 'app/views/modals/addKeywords.html';
			},
			scope: $scope,
			controller: 'addKeywordModalController',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});

		$scope.addKeywordsModal = modalDialog;

		modalDialog.result.then(function (result) {
			console.log(result);
		}, function (error) {
			if (error && error.data && error.data.Message) {
				toastr.error('Can\'t add keywords', 'Error');
			}
		});



		//var parentElem = 'body';
		//var modalInstance = $uibModal.open({
		//	animation: true,
		//	ariaLabelledBy: 'modal-title',
		//	ariaDescribedBy: 'modal-body',
		//	templateUrl: function() {
		//		return '/modals/addKeywords.jade';
		//	},
		//	controller: 'addKeywordModal.controller',
		//	controllerAs: '$akm',
		//	size: size,
		//	appendTo: parentElem,
		//	resolve: {
		//		items: function () {
		//			return $akm.items;
		//		}
		//	}
		//});

		//modalInstance.result.then(function (selectedItem) {
		//	$ctrl.selected = selectedItem;
		//}, function () {
		//	$log.info('Modal dismissed at: ' + new Date());
		//});
	};
}


keywordsController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'keywordsService', '$uibModal', 'toastr'];
keywordsApp.controller("keywordsController", keywordsController);

