'use strict';

	/* @ngInject */
	function LoginCtrl($rootScope, $scope, $http, $location){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Login and Register here, oh.... I almost forgot.... <3';	
            var authenticate = function(credentials, callback) {

                var headers = credentials ? {authorization : 'Basic '
                    + btoa(credentials.username + ':' + credentials.password)
                } : {};

                var temp = $resource('user',
                {},
                {'query': {method: 'GET', isArray: true, headers:{'X-Requested-With': 'XMLHttpRequest','Content-Type':'charset=UTF-8'} }});
                var data = temp.query();
                data.$promise.then( function() {
                    if (data.name) {
                        $rootScope.authenticated = true;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    callback && callback();
                    }
                    success( data );
                )
                error(function() {
                    $rootScope.authenticated = false;
                    callback && callback();
                });
                    
                //});

                /*$http.get('user', {headers : headers}).success(function(data) {
                  if (data.name) {
                    $rootScope.authenticated = true;
                  } else {
                    $rootScope.authenticated = false;
                  }
                  callback && callback();
                }).error(function() {
                  $rootScope.authenticated = false;
                  callback && callback();
                });*/

            };

            authenticate();
            $scope.credentials = {};
            $scope.login = function() {
                authenticate($scope.credentials, function() {
                    if ($rootScope.authenticated) {
                        $location.path('/');
                        $scope.error = false;
                    } else {
                        $location.path('/login');
                        $scope.error = true;
                    }
                });
            };

		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.login').controller('LoginCtrl', LoginCtrl); 
