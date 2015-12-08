'use strict';

/*var jQuery = require('jquery');
var $ = jQuery;*/
var angular = require('angular');
var uirouter = require('angular-ui-router');
var uibs = require('angular-ui-bootstrap');

/*jQuery(document).ready(function() {
	console.log("jQuery here!");
});*/

/* @ngInject */
var app = angular.module('booksApp', [uibs, uirouter,'templates']);

/* @ngInject */
function MainCtrl($scope){
	$scope.test = 'Hello';	
}

/* @ngInject */
app.controller('MainCtrl', ['$scope', MainCtrl]); 