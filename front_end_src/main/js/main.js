'use strict';

var jQuery = require('jquery');
var angular = require('angular');
var uibs = require('angular-ui-bootstrap');

var app = angular.module('booksApp', [uibs]);

app.controller('MainCtrl', ['$scope', function($scope){
	$scope.test = 'Hello';	
}]); 