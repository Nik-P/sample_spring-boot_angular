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
	'booksApp.login',
	'booksApp.friends',
	'booksApp.notifications']);

  angular.module('booksApp').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/home');

      /*--- Deprecated Security ---*/
      //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  });


/*var app = angular.module('booksApp', 
	[uibs, 
	uirouter,
	'templates',
	'booksApp.home']);*/

	/* @ngInject */
	function MainCtrl($scope, sessionService){
		$scope.test = 'Hello';	
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	        if ( angular.isDefined( toState.data.pageTitle ) ) {
	            $scope.pageTitle = toState.data.pageTitle + ' | Book' ;
	        }
	    });

	    $scope.isLoggedIn = sessionService.isLoggedIn;

		$scope.logout = function(){ 
			if($scope.isLoggedIn()){
				sessionService.logout(); 
			}
		};
	}
	/* @ngInject */
	angular.module('booksApp').controller('MainCtrl', MainCtrl);


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
angular.module('booksApp.login', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        views: {
            'main': {
                controller: 'LoginCtrl as model',
                templateUrl: 'front_end_src/main/js/login/login.html'
            }
        },
        data:{ pageTitle: 'Login' }
    });
});
'use strict';

/* @ngInject */
angular.module('booksApp.notifications', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('notifications', {
        url: '/notifications',
        views: {
            'main': {
                controller: 'NotificationsCtrl as model',
                templateUrl: 'front_end_src/main/js/notifications/notifications.html'
            }
        },
        data:{ pageTitle: 'User notifications' }
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
        data:{ pageTitle: 'Profile' }
    });
});
'use strict';

	/* @ngInject */
	function BooksCtrl(BookService, $stateParams, sessionService, $state){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'All Books are good for you <3';
        	
            model.view = $stateParams.view;

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

            model.initBooks = function(){
                if(model.isLoggedIn()){
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
                        /* Select requests clause Init */
                        model.singleSelect = 'all';
                        /* Search model Init */
                        model.search = {};
                        model.searchMode = true;
                        /* Owner of book Init ==> Coresponding SQL TABLE User */
                        model.search.owner = {};
                        /* Borrower of book Init ==> Coresponding SQL TABLE User */
                        model.search.borrower= {};
                        /* UserBook Init ==> Coresponding SQL TABLE UserBook */
                        model.search.book = {};
                        /* Book Init ==> Coresponding SQL TABLE Book */
                        model.search.book.book = {};
                        model.filterRequest = function(){
                            if(model.singleSelect == 'all'){
                                model.search.owner = {};
                                model.search.borrower = {};
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = true;
                            }
                            else if(model.singleSelect == 'for-me'){
                                model.search.owner.email = "book1@hot.gr";
                                model.search.borrower = {};
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = true;
                            }
                            else if(model.singleSelect == 'by-me'){
                                model.search.owner = {};
                                model.search.borrower = "book1@hot.gr";
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = true;
                            }
                            else/* if(model.singleSelect == 'by-book-title')*/{
                                model.search.owner = {};
                                model.search.borrower = {};
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = false;
                                //model.search.book.book.title = '';
                            }
                        };
                        model.getAllBorrowRequests(1);
                        /*model.getMyBorrowRequests(1);*/
                    }
                    else{
                        model.getAllBooks();
                    }
                }
                else{
                    if(model.view === 'friends' || model.view === 'friends-available' 
                    || model.view === 'my_books' || model.view === 'my_book_requests'){
                        $state.go('login');
                    }
                    else{
                        model.getAllBooks();
                    }
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

            model.getAllBorrowRequests = function(id){
                BookService.getAllBorrowRequests(id,
                function(books){
                    console.log('Retrieved my borrow Requests');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving borrow requests');
                });
            };

            /*model.getMyBorrowRequests = function(id){
                BookService.getMyBorrowRequests(id,
                function(books){
                    console.log('Retrieved my Borrow Requests');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving borrow requests');
                });
            };

           model.getFriendBorrowRequests = function(id){
                BookService.getFriendBorrowRequests(id,
                function(books){
                    console.log('Retrieved my friends Borrow Requests');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving borrow requests');
                });
            };*/

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

        service.getFriendBorrowRequests = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/lent',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        /*All outcoming and incoming requests*/
        service.getAllBorrowRequests = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/borrow-lent',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        /*
        service.getMyBorrowRequests = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/borrow',
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };
        */

        service.getFriendsBooks = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/books?view=friends-available',
            {},
            {'query': {method: 'GET', isArray: false, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        service.getUserBooks = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/books?view=mine',
            {},
            {'query': {method: 'GET', isArray: false, headers:{'Content-Type':'charset=UTF-8'} }});
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
	function LoginCtrl($rootScope, $scope, $state, UserService, sessionService){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'Login and Register here, oh.... I almost forgot.... <3';	
            
            $scope.login = function() {
		        UserService.userExists($scope.account, function(account) {
		            sessionService.login($scope.account).then(function() {
		                $state.go('home');
		            });
		        },
		        function() {
		            alert('Error logging in user');
		        });
		    };

		    $scope.register = function() {
		        UserService.register($scope.account,
		        function(returnedData) {
		            sessionService.login($scope.account).then(function() {
		                $state.go('home');
		            });
		        },
		        function() {
		            alert('Error registering user');
		        });
		    };

		}

		init();
	}

	/* @ngInject */
	angular.module('booksApp.login').controller('LoginCtrl', LoginCtrl); 

'use strict';

/* @ngInject */
angular.module('booksApp.login')


.factory('sessionService', function($http) {
    var session = {};
    session.login = function(data) {
        //return $http.post('/basic-web-app/login', 'email=' + data.email +
        return $http.post('/users/login', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
                //'Content-Type': 'application/x-www-form-urlencoded'
            }
        } ).then(function(data) {
            console.log('login successful');
            console.log(data);
            /*var userData = {};
            userData.email = data.data.email;
            userData.id = data.data.id;
            userData.firstName = data.data.firstName;
            userData.surName = data.data.surName;
            console.log(userData);*/
            localStorage.setItem('session', data.data.id);
        }, function(data) {
            alert('error logging in');
        });
    };
    session.logout = function() {
        localStorage.removeItem('session');
    };
    session.getUserInfo = function() {
            return localStorage.getItem('session');
    };
    session.isLoggedIn = function() {
        return localStorage.getItem('session') !== null;
    };
    return session;
});
/*.factory('accountService', function($resource) {
    var service = {};
    service.register = function(account, success, failure) {
        var Account = $resource('/users');
        Account.save({}, account, success, failure);
    };
    service.getAccountById = function(accountId) {
        var Account = $resource('/users/:paramAccountId');
        return Account.get({paramAccountId:accountId}).$promise;
    };
    service.userExists = function(account, success, failure) {
        var Account = $resource('/users');
        var data = Account.get({email:account.name, password:account.password}, function() {
            var accounts = data.accounts;
            if(accounts.length !== 0) {
                success(account);
            } else {
                failure();
            }
        },
        failure);
    };
    service.getAllAccounts = function() {
          var Account = $resource('/users');
          return Account.get().$promise.then(function(data) {
            return data.accounts;
          });
    };
    return service;
})*/
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


'use strict';

/* @ngInject */
angular.module('booksApp.notifications')
    
    /* @ngInject */
    .factory('NotificationsService', function($resource) {
        var service = {};
        
        service.getAllNotifications = function(id ,success, failure) {
            var temp = $resource('users/'+id+'/active-borrowed-books',
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

        service.register = function(account, success, failure) {
            var Account = $resource('/users');
            Account.save({}, account, success, failure);
        };

        service.userExists = function(account, success, failure) {
            var Account = $resource('/users');
            var data = Account.get({email:account.email, password:account.password}).
            $promise.then(  function() {
                var accounts = data;
                if(accounts.length !== 0) {
                    success(account);
                } else {
                    failure();
                }
            });
            /*var Account = $resource('/users?email='+account.username+'&password='+account.password,
            {},
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = Account.query();
            data.$promise.then( function() {
                var accounts = data;
                if(accounts.length !== 0) {
                    success(account);
                } else {
                    failure();
                }
            }); */
        };

        service.getAUser = function(userId ,success, failure) {
            var temp = $resource('users/'+userId,
            {},
            {'query': {method: 'GET', isArray: false, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        return service;
    });