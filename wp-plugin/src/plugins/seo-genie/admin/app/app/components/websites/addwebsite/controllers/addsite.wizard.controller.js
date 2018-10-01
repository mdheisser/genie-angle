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
        "$injector",
        "editableOptions",
        "editableThemes",
        "REST"
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
        $injector,
        editableOptions,
        editableThemes,
        REST
    ) {
        var vm = this;

        vm.domains = [];
        vm.searchEngines = [];
        vm.seViews = [];
        vm.changeDomains = changeDomains;
        vm.selectDomain = selectDomain;

        activate();

        //////////////

        function activate() {
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

            vm.seViews = [{
                    index: 0,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    selectedEngine: 'Google',
                    selectedDomain: '',
                    domainSelected: false,
                    domainChecking: false
                }, {
                    index: 1,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    selectedEngine: 'Yahoo',
                    domainSelected: false,
                    domainChecking: false
                },
                {
                    index: 2,
                    engines: angular.copy(vm.searchEngines),
                    domains: [{}],
                    selectedEngine: 'Bing',
                    domainSelected: false,
                    domainChecking: false
                }
            ];

            getDomains();

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
        }

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

        // Get social domains from web service.
        function getDomains () {
            websitesService.getGoogleDomains().then(function (response) {
                vm.domains.google = response.data;
                vm.seViews[0].domains = response.data;
                vm.seViews[0].selectedDomain = response.data[0];
            });
            websitesService.getYahooDomains().then(function (response) {
                vm.domains.yahoo = response.data;
                vm.seViews[1].domains = response.data;
                vm.seViews[1].selectedDomain = response.data[0];
            });
            websitesService.getBingDomains().then(function (response) {
                vm.domains.bing = response.data;
                vm.seViews[2].domains = response.data;
                vm.seViews[2].selectedDomain = response.data[0];
            });
            websitesService.getYandexDomains().then(function (response) {
                vm.domains.yandex = response.data;
            });
        }

        // Update subdomains by selecting the search engine.
        function changeDomains($item) {
            switch ($item.selectedEngine) {
                case 'Google':
                    $item.domains = vm.domains.google;
                    $item.selectedDomain = vm.domains.google[0];
                    break;
                case 'Yahoo':
                    $item.domains = vm.domains.yahoo;
                    $item.selectedDomain = vm.domains.yahoo[0];
                    break;
                case 'Bing':
                    $item.domains = vm.domains.bing;
                    $item.selectedDomain = vm.domains.bing[0];
                    break;
                case 'Yandex':
                    $item.domains = vm.domains.yandex;
                    $item.selectedDomain = vm.domains.yandex[0];
                    break;
            };
        }

        // Show check icon when a subdomain is selected.
        function selectDomain(item) {
            item.domainChecking = true;
            item.domainSelected = false;
            $timeout(function () {
                item.domainChecking = false;
                item.domainSelected = true;
            }, 1000);
        }

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


        vm.updateKeyword = function ($index, model) {
            vm.keywordsInput[$index] = model;
        };

        vm.updateKeywords = function () {
            vm.stepData[1].data.keywords = angular.copy(vm.keywordsInput);
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
                return "app/components/websites/addwebsite/templates/wizard-step-general.html";
            if (name === "keywords")
                return "app/components/websites/addwebsite/templates/wizard-step-keywords.html";
            if (name === "confirmation")
                return "app/components/websites/addwebsite/templates/wizard-step-confirmation.html";
            if (name === "wizard-general-internal")
                return "app/components/websites/addwebsite/templates/wizard-general-internal.html";
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