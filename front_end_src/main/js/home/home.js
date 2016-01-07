'use strict';

	/* @ngInject */
	function HomeCtrl($scope){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Home is where the wifi is free <3';	
		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.home').controller('HomeCtrl', ['$scope', HomeCtrl]); 

