var pagesController = function ($scope, $timeout, $resource, $q, $location, pagesService, sitesService) {
	var vm = this;
	$scope.loading = true;

	

	var viewModes = [
		{ mode: 'table', title: 'Table', icon: 'fa-table' },
		{ mode: 'list', title: 'List', icon : 'fa-list' }
	];

	vm.currentViewMode = viewModes[0];

	//var generatePageRow = function () {
	//	var pages = [];
	//};

	//$scope.totalItems = 64;ыыыыыыыыыы
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
		vm.pages = [];

		$scope.currentSite = sitesService.getCurrentSite();

		var postData = {
			siteId: $scope.currentSite.siteId
		}

		pagesService.getPages(postData).then(function (response) {
			$scope.loading = false;
			vm.pages = angular.fromJson(response.data);
			console.log(vm.pages);
			$scope.initKnobs(vm.pages);
			vm.currentViewMode = viewModes[0];
		});


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

	$scope.showDetailed = function(currentPage) {
		currentPage.isDetailedView = !currentPage.isDetailedView;
	};

	$scope.closeDetails = function (currentPage) {
		currentPage.isDetailedView = false;
	};

	$scope.refreshGrid = function () {
		vm.pages = [];
		$scope.loading = true;
		pagesService.getPages(1).then(function (response) {
			$scope.loading = false;
			vm.pages = response.data;
		});
	};

	$scope.getTemplate = function() {
		if (vm.currentViewMode.mode === 'table')
			return 'app/views/partials/pages.grid.html';
		if (vm.currentViewMode.mode === 'list')
			return 'app/views/partials/pages.list.html';
		return 'app/views/partials/pages.grid.html';
	};

	$scope.changeTableMode = function () {
		vm.currentViewMode = viewModes[0];
	};

	$scope.changeListMode = function () {
		vm.currentViewMode = viewModes[1];
	};


}


pagesController.$inject = ['$scope', '$timeout', '$resource', '$q', '$location', 'pagesService', 'sitesService'];
pagesApp.controller("pagesController", pagesController);

