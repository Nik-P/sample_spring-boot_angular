'use strict';

/*var jQuery = require('jquery');
var $ = jQuery;*/
var angular = require('angular');
//var ngResource = require('ng-resource');
var uirouter = require('angular-ui-router');
var uibs = require('angular-ui-bootstrap');

/* @ngInject */
angular.module('booksApp', 
	[uibs, 
	uirouter,
	'ngResource',
	'templates',
	'booksApp.home',
	'booksApp.books',
	'booksApp.user',
	'booksApp.login',
	'booksApp.friends',
	'booksApp.notifications']);

  angular.module('booksApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/home');

      /*--- Deprecated Security ---*/
      //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  });


/*var app = angular.module('booksApp', 
	[uibs, 
	uirouter,
	'templates',
	'booksApp.home']);*/

	/* @ngInject */
	function MainCtrl($scope, sessionService){
		$scope.test = 'Hello';	
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	        if ( angular.isDefined( toState.data.pageTitle ) ) {
	            $scope.pageTitle = toState.data.pageTitle + ' | Book' ;
	        }
	    });
	    
		//Is the user logged in?
	    $scope.isLoggedIn = sessionService.isLoggedIn;

		$scope.logout = function(){ 
			if($scope.isLoggedIn()){
				sessionService.logout(); 
			}
		};
	}
	/* @ngInject */
	angular.module('booksApp').controller('MainCtrl', MainCtrl);

