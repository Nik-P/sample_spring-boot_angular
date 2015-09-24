'use strict';

var angular = require('angular');
var uibs = require('angular-ui-bootstrap');

angular.module('booksApp', [uibs])

	.controller('MainCtrl',function($scope){
		$scope.test = 'Hello';	
	}); 