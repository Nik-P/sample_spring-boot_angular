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
	'booksApp.friends']);

  angular.module('booksApp').config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
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
	}

	/* @ngInject */
	angular.module('booksApp').controller('MainCtrl', ['$scope', MainCtrl]);

