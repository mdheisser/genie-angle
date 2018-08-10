/*jshint -W069 */
/*global angular:false, btoa */
angular.module('API', [])
    .factory('API', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         * SEOgenie REST Specification 
         * @class API
         * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
         * @param {string} [domainOrOptions.domain] - The project domain
         * @param {string} [domainOrOptions.cache] - An angularjs cache implementation
         * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
         * @param {string} [cache] - An angularjs cache implementation
         */
        var API = (function() {
            function API(options, cache) {
                var domain = (typeof options === 'object') ? options.domain : options;
                this.domain = typeof(domain) === 'string' ? domain : 'https://locahost/api';
                if (this.domain.length === 0) {
                    throw new Error('Domain parameter must be specified as a string.');
                }
                cache = cache || ((typeof options === 'object') ? options.cache : cache);
                this.cache = cache;
            }

            function mergeQueryParams(parameters, queryParameters) {
                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }
                return queryParameters;
            }

            /**
             * HTTP Request
             * @method
             * @name API#request
             * @param {string} method - http method
             * @param {string} url - url to do request
             * @param {object} parameters
             * @param {object} body - body parameters / object
             * @param {object} headers - header parameters
             * @param {object} queryParameters - querystring parameters
             * @param {object} form - form data object
             * @param {object} deferred - promise object
             */
            API.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
                var options = {
                    timeout: parameters.$timeout,
                    method: method,
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = API.transformRequest;
                }
                $http(options)
                    .then(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .catch(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

            };

            API.prototype.$on = function($scope, path, handler) {
                var url = this.domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            API.prototype.$broadcast = function(path) {
                var url = this.domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            API.transformRequest = function(obj) {
                var str = [];
                for (var p in obj) {
                    var val = obj[p];
                    if (angular.isArray(val)) {
                        val.forEach(function(val) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                        });
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                    }
                }
                return str.join("&");
            };

            /**
             * Login to the System
             * @method
             * @name API#getUserToken
             * @param {object} parameters - method options and parameters
             * @param {} parameters.credential - Login Data
             */
            API.prototype.getUserToken = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/account/login';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['credential'] !== undefined) {
                    body = parameters['credential'];
                }

                if (parameters['credential'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: credential'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Register new account to the System
             * @method
             * @name API#registerUser
             * @param {object} parameters - method options and parameters
             * @param {} parameters.credential - Register Data
             */
            API.prototype.registerUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/account/register';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['credential'] !== undefined) {
                    body = parameters['credential'];
                }

                if (parameters['credential'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: credential'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Send confirmation code
             * @method
             * @name API#confirmRegister
             * @param {object} parameters - method options and parameters
             * @param {} parameters.confirmData - Confirmation Data
             */
            API.prototype.confirmRegister = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/account/confirm';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['confirmData'] !== undefined) {
                    body = parameters['confirmData'];
                }

                if (parameters['confirmData'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: confirmData'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Send request for fogotten password
             * @method
             * @name API#forgotPassword
             * @param {object} parameters - method options and parameters
             * @param {} parameters.forgotPasswordData - forgot password data
             */
            API.prototype.forgotPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/account/forgotPassword';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['forgotPasswordData'] !== undefined) {
                    body = parameters['forgotPasswordData'];
                }

                if (parameters['forgotPasswordData'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: forgotPasswordData'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Confirm Password
             * @method
             * @name API#confirmPassword
             * @param {object} parameters - method options and parameters
             * @param {} parameters.confirmPasswordData - confirm password data
             */
            API.prototype.confirmPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/account/confirmPassword';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['confirmPasswordData'] !== undefined) {
                    body = parameters['confirmPasswordData'];
                }

                if (parameters['confirmPasswordData'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: confirmPasswordData'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns user's sites
             * @method
             * @name API#getUserSites
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.userId - User id to return
             */
            API.prototype.getUserSites = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/sites';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['userId'] !== undefined) {
                    queryParameters['userId'] = parameters['userId'];
                }

                if (parameters['userId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: userId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Add new Site to the System
             * @method
             * @name API#postSites
             * @param {object} parameters - method options and parameters
             * @param {} parameters.body - Site sata
             */
            API.prototype.postSites = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/sites';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['body'] !== undefined) {
                    body = parameters['body'];
                }

                if (parameters['body'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: body'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Verify Site availability
             * @method
             * @name API#checkSite
             * @param {object} parameters - method options and parameters
             */
            API.prototype.checkSite = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/sites/checkSite';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns all keywords from the system that the user has access to
             * @method
             * @name API#getKeywords
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.siteId - Site Id of needed site
             */
            API.prototype.getKeywords = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keywords';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['siteId'] !== undefined) {
                    queryParameters['siteId'] = parameters['siteId'];
                }

                if (parameters['siteId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: siteId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Add new Keyword to the System
             * @method
             * @name API#createKeyword
             * @param {object} parameters - method options and parameters
             * @param {} parameters.keyword - Keyword Data
             */
            API.prototype.createKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keywords';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keyword'] !== undefined) {
                    body = parameters['keyword'];
                }

                if (parameters['keyword'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keyword'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update Keyword
             * @method
             * @name API#updateKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.id - Keyword id to return
             * @param {} parameters.keyword - Keyword Data
             */
            API.prototype.updateKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keywords/{id}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['keyword'] !== undefined) {
                    body = parameters['keyword'];
                }

                if (parameters['keyword'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keyword'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete Keyword
             * @method
             * @name API#deleteKeywordsById
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.id - Keyword id to return
             */
            API.prototype.deleteKeywordsById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keywords/{id}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns all keyword properties from the system that the user has access to
             * @method
             * @name API#getKeywordCategory
             * @param {object} parameters - method options and parameters
             */
            API.prototype.getKeywordCategory = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keywordCategory';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Get pages of specific site
             * @method
             * @name API#getPages
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.siteId - Page Data
             */
            API.prototype.getPages = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/pages';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['siteId'] !== undefined) {
                    queryParameters['siteId'] = parameters['siteId'];
                }

                if (parameters['siteId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: siteId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Add new page to the System
             * @method
             * @name API#postPages
             * @param {object} parameters - method options and parameters
             * @param {} parameters.page - Page Data
             */
            API.prototype.postPages = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/pages';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['page'] !== undefined) {
                    body = parameters['page'];
                }

                if (parameters['page'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: page'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * fetch page data
             * @method
             * @name API#getPageDetail
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.pageId - Site Id of needed site
             */
            API.prototype.getPageDetail = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/pages/{pageId}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{pageId}', parameters['pageId']);

                if (parameters['pageId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: pageId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update Page
             * @method
             * @name API#updatePage
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.pageId - Site Id of needed site
             * @param {} parameters.page - Page Data
             */
            API.prototype.updatePage = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/pages/{pageId}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{pageId}', parameters['pageId']);

                if (parameters['pageId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: pageId'));
                    return deferred.promise;
                }

                if (parameters['page'] !== undefined) {
                    body = parameters['page'];
                }

                if (parameters['page'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: page'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete Page from the system
             * @method
             * @name API#deletePagesByPageId
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.pageId - Site Id of needed site
             */
            API.prototype.deletePagesByPageId = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/pages/{pageId}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{pageId}', parameters['pageId']);

                if (parameters['pageId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: pageId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns all violations
             * @method
             * @name API#getAllViolations
             * @param {object} parameters - method options and parameters
             */
            API.prototype.getAllViolations = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/violations';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Add new violation to the System
             * @method
             * @name API#createViolation
             * @param {object} parameters - method options and parameters
             * @param {} parameters.violation - Violation Data
             */
            API.prototype.createViolation = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/violations';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['violation'] !== undefined) {
                    body = parameters['violation'];
                }

                if (parameters['violation'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: violation'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update Violation
             * @method
             * @name API#updateViolation
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.id - violation id
             * @param {} parameters.violation - Violation Data
             */
            API.prototype.updateViolation = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/violations/{id}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['violation'] !== undefined) {
                    body = parameters['violation'];
                }

                if (parameters['violation'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: violation'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete violation from the system
             * @method
             * @name API#deleteViolation
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.id - violation id
             */
            API.prototype.deleteViolation = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/violations/{id}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns all System users
             * @method
             * @name API#getUsers
             * @param {object} parameters - method options and parameters
             */
            API.prototype.getUsers = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/users';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns user basic info
             * @method
             * @name API#getUserInfoById
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.id - User id to return
             */
            API.prototype.getUserInfoById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/users/{id}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };

            return API;
        })();

        return API;
    }]);