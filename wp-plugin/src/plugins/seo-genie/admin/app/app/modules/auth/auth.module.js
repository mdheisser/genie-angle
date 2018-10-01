(function () {
  'use strict';

  angular.module('app.auth', ['ui.router'])
    .provider('auth', authProvider);

  function authProvider() {
    /* jshint validthis:true */
    var provider = this;
    var loginState = 'page.auth.login';

    provider.setLoginState = setLoginState;
    provider.httpInterceptor = httpInterceptor;
    provider.$get = authService;

    ////////////////

    function setLoginState(value) {
      loginState = value;
    }

    httpInterceptor.$inject = ['$injector', '$q'];

    function httpInterceptor($injector, $q) {
      return {
        request: interceptRequest,
        responseError: interceptResponseError
      };

      function interceptRequest(config) {
        var auth = $injector.get('auth');
        // Add Bearer authorization header if token is set
        config.headers = config.headers || {};
        if (auth.getToken()) {
          config.headers.Authorization = 'Bearer ' + auth.getToken();
        }
        return config;
      }

      function interceptResponseError(rejection) {
        var auth = $injector.get('auth');
        // Delete token if a 401 is received
        if (rejection !== null && rejection.status === 401) {
          auth.logout();
        }
        return $q.reject(rejection);
      }
    }

    authService.$inject = ['$rootScope', '$state', '$localStorage'];

    function authService($rootScope, $state, $localStorage) {
      var STORAGE_KEY = {
        TOKEN: 'user.auth.token',
        USER: 'user.auth.data'
      };

      var token, user;
      var service = {
        returnToState: null,
        returnToStateParams: null,
        initialize: initialize,
        login: login,
        logout: logout,
        isGuest: isGuest,
        getToken: getToken,
        getUser: getUser,
        updateUser: setUser,
        hasRole: hasRole,
        hasAnyRole: hasAnyRole,
        authorize: authorize
      };
      return service;

      ////////////////

      function initialize() {
        // Try to load token and user data from session storage
        token = $localStorage[STORAGE_KEY.TOKEN] || null;
        user = angular.fromJson($localStorage[STORAGE_KEY.USER]) || {};
        if (!isGuest()) {
          $rootScope.$broadcast('auth.login', user);
        }

        // Authorize state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
          service.authorize(event, toState, toStateParams);
        });
      }

      function login(token, user) {
        setToken(token);
        setUser(user);
        $rootScope.$broadcast('auth.login', user);
      }

      function logout() {
        setToken(null);
        setUser({});
        $rootScope.$broadcast('auth.logout', user);
        $state.go(loginState);
      }

      function isGuest() {
        return !token;// || isEmpty(user);
      }

      function setToken(value) {
        token = value;
        $localStorage[STORAGE_KEY.TOKEN] = token;
      }

      function getToken() {
        return token;
      }

      function setUser(value) {
        $localStorage[STORAGE_KEY.USER] = angular.toJson(value);
      }

      function getUser() {
        return user;
      }

      function hasRole(role) {
        if (role === '*') {
          return true;
        }
        if (role === '?') {
          return service.isGuest();
        }
        if (role === '@') {
          return !service.isGuest();
        }
        return user && user.roles && user.roles.indexOf(role) !== -1;
      }

      function hasAnyRole(roles) {
        for (var i = 0; i < roles.length; i++) {
          if (service.hasRole(roles[i])) {
            return true;
          }
        }
        return false;
      }

      function authorize(event, state, stateParams) {
        if (state.data && state.data.roles && state.data.roles.length > 0 && !service.hasAnyRole(state.data.roles)) {
          // role is required that identity does not have
          service.returnToState = state;
          service.returnToStateParams = stateParams;
          event.preventDefault();
          logout();
        }
      }

      function isEmpty(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
            return false;
        }

        return true;
      }
    }
  }

})();