'use strict';

	/* @ngInject */
	function UserCtrl(UserService){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Ohh,this is a page for users <3';	

        	model.initUser = function() {
        		model.getMyInfo(1);
        	};

        	model.getMyInfo = function(id){
                UserService.getAUser(id,
                function(user){
                    console.log('Retrieved Books');
                    model.user = user;
                },
                function(){
                    alert('Error retrieving friends books');
                });
            };	

		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.user').controller('UserCtrl', UserCtrl); 

