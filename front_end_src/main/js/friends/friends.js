'use strict';

	/* @ngInject */
	function FriendsCtrl(FriendService, sessionService, $state){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'My friends';

            //Is the user logged in?
            model.isLoggedIn = sessionService.isLoggedIn;

        	model.initFriends = function() {
            //Get friend list
                if(model.isLoggedIn()){
                //If user is logged in, retrieve friend list
                  model.userInfo = sessionService.getUserInfo();
                  model.getAllFriends(model.userInfo);
                  
                }
                else{
                //If user is not logged in, redirest to login page
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

