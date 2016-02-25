'use strict';

	/* @ngInject */
	function FriendsCtrl(FriendService, sessionService, $state){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'My friends <3';

            model.isLoggedIn = sessionService.isLoggedIn;

        	model.initFriends = function() {
                if(model.isLoggedIn()){
                  model.userInfo = sessionService.getUserInfo();
                  model.getAllFriends(model.userInfo);
                  
                }
                else{
                    $state.go('login');
                }
            };

        	model.getAllFriends = function(id){
                FriendService.getAllFriends(id,
                function(friends){
                    console.log('Retrieved Friends info');
                    model.friends = friends;
                },
                function(){
                    alert('Error retrieving friends books');
                });
            };	
		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.friends').controller('FriendsCtrl', FriendsCtrl); 

