'use strict';

	/* @ngInject */
	function UserCtrl(UserService, sessionService, $state){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Ohh,this is a page for users <3';	

            model.isLoggedIn = sessionService.isLoggedIn;

        	model.initUser = function() {
                if(model.isLoggedIn()){
        		  model.userInfo = sessionService.getUserInfo();
                  model.getMyInfo(model.userInfo);
                  
                }
                else{
                    $state.go('login');
                }
        	};

            model.getMyInfo = function(id){
                UserService.getAUser(id,
                function(user){
                    console.log('Retrieved User info');
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

