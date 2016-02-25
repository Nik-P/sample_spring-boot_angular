'use strict';

	/* @ngInject */
	function NotificationsCtrl(NotificationsService, sessionService, $state){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Check your notifications <3';	

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
                NotificationsService.getAllNotifications(id,
                function(notifications){
                    console.log('Retrieved User info');
                    model.notifications = notifications;
                },
                function(){
                    alert('Error retrieving friends books');
                });
            };	

		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.notifications').controller('NotificationsCtrl', NotificationsCtrl); 

