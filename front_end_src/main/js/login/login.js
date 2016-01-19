'use strict';

	/* @ngInject */
	function LoginCtrl($rootScope, $scope, $state, UserService, sessionService){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Login and Register here, oh.... I almost forgot.... <3';	
            
            $scope.login = function() {
		        UserService.userExists($scope.account, function(account) {
		            sessionService.login($scope.account).then(function() {
		                $state.go("home");
		            });
		        },
		        function() {
		            alert("Error logging in user");
		        });
		    };

		    $scope.register = function() {
		        UserService.register($scope.account,
		        function(returnedData) {
		            sessionService.login($scope.account).then(function() {
		                $state.go("home");
		            });
		        },
		        function() {
		            alert("Error registering user");
		        });
		    };

		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.login').controller('LoginCtrl', LoginCtrl); 
