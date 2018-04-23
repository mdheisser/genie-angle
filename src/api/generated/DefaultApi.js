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
             * Returns keywords from the system that the user has access to
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
             * Returns a keyword's detail information from the system that the user has access to
             * @method
             * @name API#getKeywordDetail
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.getKeywordDetail = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword-detail';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is default, else return false
             * @method
             * @name API#activeDefaultKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.activeDefaultKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/active-default';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is not default, else return false
             * @method
             * @name API#deactiveDefaultKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.deactiveDefaultKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/deactive-default';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is forced, else return false
             * @method
             * @name API#activeForcedKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.activeForcedKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/active-forced';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is not forced, else return false
             * @method
             * @name API#deactiveForcedKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.deactiveForcedKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/deactive-forced';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is promoted, else return false
             * @method
             * @name API#activePromotedKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.activePromotedKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/active-promoted';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is not promoted, else return false
             * @method
             * @name API#deactivePromotedKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.deactivePromotedKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/deactive-promoted';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is monitored, else return false
             * @method
             * @name API#activeMonitoredKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.activeMonitoredKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/active-monitored';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns true if selected keyword is not monitored, else return false
             * @method
             * @name API#deactiveMonitoredKeyword
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.keywordId - keyword Id of needed keyword
             */
            API.prototype.deactiveMonitoredKeyword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/keyword/deactive-monitored';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['keywordId'] !== undefined) {
                    queryParameters['keywordId'] = parameters['keywordId'];
                }

                if (parameters['keywordId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: keywordId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Returns pages from the system that the user has access to
             * @method
             * @name API#getPages
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.siteId - Site Id of needed site
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
             * Returns violation status of the page
             * @method
             * @name API#getPageViolation
             * @param {object} parameters - method options and parameters
             * @param {string} parameters.pageId - Page Id of needed page
             */
            API.prototype.getPageViolation = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/page/violation';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                if (parameters['pageId'] !== undefined) {
                    queryParameters['pageId'] = parameters['pageId'];
                }

                if (parameters['pageId'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: pageId'));
                    return deferred.promise;
                }

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Login to the System
             * @method
             * @name API#postAccountLogin
             * @param {object} parameters - method options and parameters
             * @param {} parameters.body - Login Data
             */
            API.prototype.postAccountLogin = function(parameters) {
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
                    path = '/users/userInfo/{id}';
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
            /**
             * Returns authenticated user's Sites
             * @method
             * @name API#getSites
             * @param {object} parameters - method options and parameters
             */
            API.prototype.getSites = function(parameters) {
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

                queryParameters = mergeQueryParams(parameters, queryParameters);

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

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
             * Returns users Sites
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
                    path = '/sites/{userId}';
                var body = {},
                    queryParameters = {},
                    headers = {},
                    form = {};

                headers['Accept'] = ['application/json'];
                headers['Content-Type'] = ['application/json'];

                path = path.replace('{userId}', parameters['userId']);

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
             * @name API#postSitesAddNew
             * @param {object} parameters - method options and parameters
             * @param {} parameters.body - Site sata
             */
            API.prototype.postSitesAddNew = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();
                var domain = this.domain,
                    path = '/sites/addNew';
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

            return API;
        })();

        return API;
    }]);