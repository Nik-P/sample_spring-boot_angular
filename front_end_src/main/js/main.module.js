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
	'booksApp.friends']);

  angular.module('booksApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/home');

      /*--- Deprecated Security ---*/
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  });


/*var app = angular.module('booksApp', 
	[uibs, 
	uirouter,
	'templates',
	'booksApp.home']);*/

	/* @ngInject */
	function MainCtrl($scope){
		$scope.test = 'Hello';	
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if ( angular.isDefined( toState.data.pageTitle ) ) {
            $scope.pageTitle = toState.data.pageTitle + ' | Book' ;
        }
    });

    $scope.logout = function() {
		  $http.post('logout', {}).success(function() {
		    $rootScope.authenticated = false;
		    $location.path("/");
		  }).error(function(data) {
		    $rootScope.authenticated = false;
		  });
		}
	}
	/* @ngInject */
	angular.module('booksApp').controller('MainCtrl', ['$scope', MainCtrl]);

