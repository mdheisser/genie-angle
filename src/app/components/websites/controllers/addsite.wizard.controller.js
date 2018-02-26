(function (angular) {
	"use strict";

	angular
		.module("components.websites")
		.controller("addSiteWizardController", addSiteWizardController);

	addSiteWizardController.$inject = [
		"$scope",
		"$timeout",
		"$resource",
		"$q",
		"$location",
		"websitesService",
		"usersService",
		"keywordsService",
		"$uibModal",
		"toastr",
		"components.services",
		"$injector",
		"editableOptions",
		"editableThemes"
	];

	function addSiteWizardController(
		$scope,
		$timeout,
		$resource,
		$q,
		$location,
		websitesService,
		usersService,
		keywordsService,
		$uibModal,
		toastr,
		API,
		$injector,
		editableOptions,
		editableThemes
	) {
		var vm = this;
		$scope.loading = true;
		var $validationProvider = $injector.get('$validation');

		$scope.form = {
			checkValid: $validationProvider.checkValid,
			submit: function (form) {
				$validationProvider.validate(form);
			},
			reset: function (form) {
				$validationProvider.reset(form);
			}
		};

		var init = function () {

			editableThemes.bs3.inputClass = 'input-sm';
			editableThemes.bs3.buttonsClass = 'btn-sm';
			editableOptions.theme = 'bs3';

			vm.searchEngines = [{
					name: 'Google',
					domains: [],
					icon: 'socicon-google'
				},
				{
					name: 'Yahoo',
					domains: [],
					icon: 'socicon-yahoo'
				},
				{
					name: 'Bing',
					domains: [],
					icon: 'socicon-bing'
				},
				{
					name: 'Yandex',
					domains: [],
					icon: 'socicon-yandex'
				}
			];

			websitesService.getGoogleDomains().then(function (response) {
				vm.searchEngines[0].domains = response.data;
				vm.searchEngines[0].domains.selected = vm.searchEngines[0].domains[0];
			}, function (errResponse) {
				console.log(errResponse);
			});

			websitesService.getYahooDomains().then(function (response) {
				vm.searchEngines[1].domains = response.data;
				vm.searchEngines[1].domains.selected = vm.searchEngines[1].domains[0];
			}, function (errResponse) {
				console.log(errResponse);
			});

			websitesService.getBingDomains().then(function (response) {
				vm.searchEngines[2].domains = response.data;
				vm.searchEngines[2].domains.selected = vm.searchEngines[2].domains[0];
			}, function (errResponse) {
				console.log(errResponse);
			});

			websitesService.getYandexDomains().then(function (response) {
				vm.searchEngines[3].domains = response.data;
				vm.searchEngines[3].domains.selected = vm.searchEngines[3].domains[0];
			}, function (errResponse) {
				console.log(errResponse);
			});

			vm.getDomains = function ($item, $model) {
				switch ($item.name) {
					case 'Google':
						websitesService.getGoogleDomains().then(function (response) {
							$item.domains = response.data;
							$item.domains.selected = vm.searchEngines[0].domains[0];
						});
						break;
					case 'Yahoo':
						websitesService.getYahooDomains().then(function (response) {
							$item.domains = response.data;
							$item.domains.selected = vm.searchEngines[1].domains[0];
						});
						break;
					case 'Bing':
						websitesService.getBingDomains().then(function (response) {
							$item.domains = response.data;
							$item.domains.selected = vm.searchEngines[2].domains[0];
						});
						break;
					case 'Yandex':
						websitesService.getYandexDomains().then(function (response) {
							$item.domains = response.data;
							$item.domains.selected = vm.searchEngines[3].domains[0];
						});
						break;
				};
			}

			vm.seViews = [{
					index: 0,
					viewMode: true,
					editMode: false,
					engine: vm.searchEngines[0],
					engines: angular.copy(vm.searchEngines)
				}, {
					index: 1,
					viewMode: true,
					editMode: false,
					engine: vm.searchEngines[1],
					engines: angular.copy(vm.searchEngines)
				},
				{
					index: 2,
					viewMode: true,
					editMode: false,
					engine: vm.searchEngines[2],
					engines: angular.copy(vm.searchEngines)
				}
			];


			vm.protocols = [{
					name: "http://",
					selected: true
				},
				{
					name: "https://",
					selected: false
				}
			];

			// default protocol
			vm.protocol = {
				selected: vm.protocols[0]
			};

			var langsReady = function (items) {
				vm.languages = items.data;
				// default language
				vm.languages.selected = vm.languages[1];

				vm.languages.selected = undefined;
			};

			var langsError = function (err) {
				console.log(err);
			};

			var siteTypesReady = function (items) {
				vm.siteTypes = items.data;
			};

			var siteTypesError = function (err) {
				console.log(err);
			};

			var countriesReady = function (items) {
				vm.country = {};
				vm.countries = items.data;
			};

			var countriesError = function (err) {
				console.log(err);
			};

			websitesService.getLanguages(langsReady, langsError);
			websitesService.getSiteTypes(siteTypesReady, siteTypesError);
			websitesService.getCountries(countriesReady, countriesError);

			// stepper init
			vm.selectedStep = 0;
			vm.stepProgress = 1;
			vm.maxStep = 3;
			vm.showBusyText = false;
			vm.stepData = [{
					step: 1,
					completed: false,
					optional: false,
					data: {
						website: {
							url: null
						},
						searhEngines: angular.copy(vm.searchEngines)
					}
				},
				{
					step: 2,
					completed: false,
					optional: false,
					data: {
						isMonitored: true,
						isPromoted: true,
						keywords: []
					}
				},
				{
					step: 3,
					completed: false,
					optional: false,
					data: {}
				}
			];

			var userId = 1;
			vm.currentUser = {};

			REST.getUserInfoById(userId).then(function (response) {
				if (response.data) {
					vm.currentUser = response.data;
					vm.stepData[0].data.userEmail = vm.currentUser.email;
				}
			}).catch(function (errResponse) {
				console.log(errResponse);
			});

			vm.enterModes = [{
					value: "freeText",
					label: "Free Text Mode"
				},
				{
					value: "tabular",
					label: "Tabular Mode"
				}
			];
			vm.enteringMode = vm.enterModes[0].value;

			/// GET BILLING INFO METHOD NEEDED
			vm.promotion = 3;
			vm.totalPromotion = 3;

			vm.monitoring = 5;
			vm.totalMonitoring = 10;

			vm.keywordsInputText = "";
			vm.keywordsInput = [];
			vm.keywordsEntries = [];

			// third step defaults
			vm.generateReportNow = true;
			vm.installPlugin = false;
		};

		init();

		vm.validateInput = function (name, type) {
			var input = vm.generalStepForm[name];
			return (input.$dirty) && input.$error[type];
		};

		vm.setPrimaryLanguage = function ($item) {
			vm.stepData[0].data.primaryLanguage = $item;
		};

		vm.setCountry = function ($item) {
			vm.stepData[0].data.country = $item;
		};

		vm.setSiteType = function ($item) {
			vm.stepData[0].data.siteType = $item;
		};

		vm.saveSearchEngine = function (se, sse, domain) {
			vm.stepData[0].data.searhEngines[se.index] = {
				name: sse.name,
				domain: domain
			}
			se.engine.domains.selected = domain;
			se.engine = sse;
			se.editMode = false;
			se.viewMode = true;
		};

		vm.cancelSearchEngine = function (se) {
			se.editMode = false;
			se.viewMode = true;
		};

		vm.changeEnterMode = function () {
			if (vm.enteringMode === vm.enterModes[1].value && vm.isEmptyKeywordsInput()) {
				vm.keywordsInput = [];
				_.times(vm.totalMonitoring,
					function () {
						vm.keywordsInput.push("");
					});
			}
			if (vm.enteringMode === vm.enterModes[1].value && !vm.isEmptyKeywordsInput()) {
				vm.getKeywordsFromText();
				$timeout(function () {
						_.times(vm.totalMonitoring - vm.keywordsInput.length,
							function () {
								vm.keywordsInput.push("");
							});
					},
					100);

			}
			if (vm.enteringMode === vm.enterModes[0].value && !_.isEmpty(vm.keywordsInput)) {
				vm.keywordsInputText = '';
				_.each(vm.keywordsInput, function (keyword) {
					if (!_.isEmpty(keyword)) {
						vm.keywordsInputText += keyword.trim() + '\n';
					}
				});
			}
		};

		vm.updateKeyword = function ($index, model) {
			vm.keywordsInput[$index] = model;
		};

		vm.updateKeywords = function () {
			vm.stepData[1].data.keywords = angular.copy(vm.keywordsInput);
		};

		vm.isFreeText = function () {
			return vm.enteringMode === vm.enterModes[0].value;
		};

		vm.isTabular = function () {
			return vm.enteringMode === vm.enterModes[1].value;
		};

		// ----- Stepper-------------------


		vm.enableNextStep = function nextStep() {
			//do not exceed into max step
			if (vm.selectedStep >= vm.maxStep) {
				return;
			}
			//do not increment vm.stepProgress when submitting from previously completed step
			if (vm.selectedStep === vm.stepProgress - 1) {
				vm.stepProgress = vm.stepProgress + 1;
			}
			vm.selectedStep = vm.selectedStep + 1;
		};

		vm.moveToPreviousStep = function moveToPreviousStep() {
			if (vm.selectedStep > 0) {
				vm.selectedStep = vm.selectedStep - 1;
			}
		};



		vm.submitCurrentStep = function (stepData, isSkip, form) {
			vm.showBusyText = true;
			if (!stepData.completed && !isSkip) {

				if (form.$name === 'keywordsStepForm') {
					vm.stepData[1].data.keywords = angular.copy(vm.keywordsInput);
				}

				if (form.$name === 'confirmationStepForm') {
					vm.addNewSite();
				}
				vm.showBusyText = false;
				//move to next step when success
				stepData.completed = true;
				vm.enableNextStep();
			} else {
				vm.showBusyText = false;
				vm.enableNextStep();
			}
		};



		vm.disableGeneralStep = function (form) {
			return !vm.stepData[0].data.website.url ||
				vm.showBusyText ||
				!vm.stepData[0].data.userEmail ||
				!vm.stepData[0].data.isTermOfService ||
				!vm.stepData[0].data.primaryLanguage ||
				!$scope.form.checkValid(form);
		};

		vm.urlVerify = function (url) {
			if (_.isUndefined(url) || _.isEmpty(url)) return;

			vm.urlChecking = true;
			vm.isUrlError = false;
			vm.isUrlOk = false;
			REST.checkSite(url).then(function (response) {
					if (response.data) {
						vm.urlChecking = false;
						vm.isUrlOk = true;
					}
				},
				function (errResponse) {
					console.log(errResponse);
					vm.urlChecking = false;
					vm.isUrlError = true;
				}).catch(function (errResponse) {

				vm.urlChecking = false;
				vm.isUrlError = true;
			});
		};

		vm.urlMessage = "";
		vm.verifyGeneralStep = function () {

			vm.urlMessage = "";
		};

		vm.isSkipKeywordsStep = function () {
			return false;
		};
		// -- end Stepper ------

		vm.getCountryCode = function (code) {
			if (_.isUndefined(code)) return '';
			if (code === 'NA' || _.isEmpty(code)) return '';
			return "flag-icon-" + code.toLowerCase();
		};

		vm.changeSEMode = function (se) {
			se.editMode = true;
			se.viewMode = false;
			se.engines.selected = se.engine;
			se.engines.selected.domains = se.engine.domains;
			se.engines.selected.domains.selected = se.engine.domains[0];
		};

		vm.getTemplate = function (name) {
			if (name === "general")
				return "app/components/websites/templates/wizard-step-general.html";
			if (name === "keywords")
				return "app/components/websites/templates/wizard-step-keywords.html";
			if (name === "confirmation")
				return "app/components/websites/templates/wizard-step-confirmation.html";
			if (name === "wizard-general-internal")
				return "app/components/websites/templates/wizard-general-internal.html";
			return "app/components/pages/templates/404.html";
		};

		vm.isEmptyKeywordsInput = function () {
			return _.isEmpty(vm.keywordsInputText);
		};

		vm.clearInput = function () {
			vm.keywordsInput = [];
			vm.keywordsInputText = "";
		};

		vm.getKeywordsFromText = function () {
			vm.keywordsInput = vm.keywordsInputText
				.replace(/\r\n/g, "\n").replace(/,/g, "\n")
				.split("\n");
		};

		vm.removeKeyword = function (array, index) {
			array.splice(index, 1);
		};

		vm.addNewSite = function () {
			var postData = {
				notifyEmail: vm.stepData[0].data.userEmail,
				website: {
					name: vm.stepData[0].data.website.url,
					url: vm.stepData[0].data.website.protocol,
					siteType: vm.stepData[0].data.siteType
				},
				primaryLanguageId: vm.stepData[0].data.primaryLanguage.languageId,
				countryId: vm.stepData[0].data.country == null ? null : vm.stepData[0].data.country.CountryId,
				searchEngines: vm.stepData[0].data.searhEngines,
				keywords: vm.stepData[1].data.keywords,
				generateReport: vm.generateReportNow
			}

			REST.sitesAddNewPost(postData).then(function (response) {
					if (response.data) {
						vm.showSuccess = true;
					}
				},
				function (errResponse) {
					if (errResponse)
						vm.showError = true;
				});
		};
	}

})(angular);