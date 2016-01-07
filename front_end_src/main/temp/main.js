'use strict';

/*var jQuery = require('jquery');
var $ = jQuery;*/
var angular = require('angular');
//var ngResource = require('ng-resource');
var uirouter = require('angular-ui-router');
var uibs = require('angular-ui-bootstrap');

/* @ngInject */
angular.module('booksApp', 
	[uibs, 
	uirouter,
	'ngResource',
	'templates',
	'booksApp.home',
	'booksApp.books',
	'booksApp.user',
	'booksApp.friends']);

  angular.module('booksApp').config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
  });


/*var app = angular.module('booksApp', 
	[uibs, 
	uirouter,
	'templates',
	'booksApp.home']);*/

	/* @ngInject */
	function MainCtrl($scope){
		$scope.test = 'Hello';	
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if ( angular.isDefined( toState.data.pageTitle ) ) {
            $scope.pageTitle = toState.data.pageTitle + ' | Book' ;
        }
    });
	}

	/* @ngInject */
	angular.module('booksApp').controller('MainCtrl', ['$scope', MainCtrl]);


'use strict';

/* @ngInject */
angular.module('booksApp.books', 
['ui.router',
 'ngResource']
)

.config(function ($stateProvider) {
    $stateProvider.state('books', {
        url: '/books?view',
        views: {
            'main': {
                controller: 'BooksCtrl as model',
                templateUrl: 'front_end_src/main/js/books/books.html'
            }
        },
        data:{ pageTitle: 'Books' }
    });
});
'use strict';

/* @ngInject */
angular.module('booksApp.friends', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('friends', {
        url: '/friends',
        views: {
            'main': {
                controller: 'FriendsCtrl as model',
                templateUrl: 'front_end_src/main/js/friends/friends.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
});
'use strict';

/* @ngInject */
angular.module('booksApp.home', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            'main': {
                controller: 'HomeCtrl as model',
                templateUrl: 'front_end_src/main/js/home/home.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
});
'use strict';

/* @ngInject */
angular.module('booksApp.user', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        views: {
            'main': {
                controller: 'UserCtrl as model',
                templateUrl: 'front_end_src/main/js/user/user.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
});
'use strict';

	/* @ngInject */
	function BooksCtrl(BookService, $stateParams){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'All Books are good for you <3';
        	
            model.view = $stateParams.view;

            model.initBooks = function(){
                if(model.view === 'friends'){
                    model.getFriendsBooks(1);
                }
                else if(model.view === 'friends-available'){
                    model.getFriendsBooks(1);
                }
                else if(model.view === 'my_books'){
                    model.getUserBooks(1);
                }
                else if(model.view === 'my_book_requests'){
                    model.getBorrowRequests(1);
                    /*model.getBorrowRequests(1);*/
                }
                else{
                    model.getAllBooks();
                }
            }

            model.getUserBooks = function(id){
                BookService.getUserBooks(id,
                function(books){
                    console.log('Retrieved Books');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving friends books');
                });
            };

           model.getBorrowRequests = function(id){
                BookService.getBorrowRequests(id,
                function(books){
                    console.log('Retrieved Borrow Requests');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving borrow requests');
                });
            };

            model.getFriendsBooks = function(id){
                BookService.getFriendsBooks(id,
                function(books){
                    console.log('Retrieved Books');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving friends books');
                });
            };

        	model.getAllBooks = function(){
                BookService.getAllBooks(
                function(books){
                    console.log('Retrieved Books');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving all books');
                });
            };
		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.books').controller('BooksCtrl', BooksCtrl); 


'use strict';

/* @ngInject */
angular.module('booksApp.books')
    
    /* @ngInject */
    .factory('BookService', function($resource) {
        var service = {};
        
        service.getAllBooks = function(success, failure) {
            var temp = $resource('/books',
            {},
            {'query': {method: 'GET', isArray: false, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                var books = data.content;
                success( books );
            });
        };

        service.getBorrowRequests = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/borrow',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        service.getFriendsBooks = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/books?view=friends-available',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        service.getUserBooks = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/books?view=mine',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        return service;
    });
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


'use strict';

/* @ngInject */
angular.module('booksApp.friends')
    
    /* @ngInject */
    .factory('FriendService', function($resource) {
        var service = {};
        
        service.getAllFriends = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/friends',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        service.getAFriend = function(userId ,friendId ,success, failure) {
            var temp = $resource('users/'+userId+'/friends'/+friendId,
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        return service;
    });
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


'use strict';

/* @ngInject */
angular.module('booksApp.user')
    
    /* @ngInject */
    .factory('UserService', function($resource) {
        var service = {};
        
        service.getAllUsers = function(success, failure) {
            var temp = $resource('users',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        service.getAUser = function(userId ,success, failure) {
            var temp = $resource('users/'+userId,
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        return service;
    });