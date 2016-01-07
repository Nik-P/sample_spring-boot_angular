'use strict';

	/* @ngInject */
	function FriendsCtrl(FriendService){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'My friends <3';

        	model.initFriends = function() {
        		model.getAllFriends(1);
        	};

        	model.getAllFriends = function(id){
                FriendService.getAllFriends(id,
                function(friends){
                    console.log('Retrieved Books');
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

