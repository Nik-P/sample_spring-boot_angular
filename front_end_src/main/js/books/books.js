'use strict';

	/* @ngInject */
	function BooksCtrl(BookService, $stateParams, sessionService, $state){
		var model = this;

		function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        	model.test = 'The page for displaying book info';
        	
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
                //If the user is logged in
                    if(model.view === 'friends'){
                    //Get my friends books
                        model.getFriendsBooks(1);
                    }
                    else if(model.view === 'friends-available'){
                    //Get my friends books that are available for lenting
                        model.getFriendsBooks(1);
                    }
                    else if(model.view === 'my_books'){
                    //Get the logged user's books
                        model.getUserBooks(1);
                    }
                    else if(model.view === 'my_book_requests'){
                    //Book lending requests from friends to me
                    //or from me to friends

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
                                //Show all requests
                                model.search.owner = {};
                                model.search.borrower = {};
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = true;
                            }
                            else if(model.singleSelect == 'for-me'){
                            //Show requests from my friends to me
                                model.search.owner.email = "book1@hot.gr";
                                model.search.borrower = {};
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = true;
                            }
                            else if(model.singleSelect == 'by-me'){
                            //Show requests from me to my friends
                                model.search.owner = {};
                                model.search.borrower = "book1@hot.gr";
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = true;
                            }
                            else/* if(model.singleSelect == 'by-book-title')*/{
                            //Search a specific request by book title
                                model.search.owner = {};
                                model.search.borrower = {};
                                model.search.book = {};
                                model.search.book.book = {};
                                model.searchMode = false;
                                //model.search.book.book.title = '';
                            }
                        };
                        //HTTP request for the lending requests
                        model.getAllBorrowRequests(1);
                    }
                    else{
                    //Get all the books
                        model.getAllBooks();
                    }
                }
                else{
                //If the user is not logged in, restrict where he can go
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
                    console.log('Retrieved user Books');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving user books');
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
                    console.log('Retrieved Friends Books');
                    model.books = books;
                },
                function(){
                    alert('Error retrieving friends books');
                });
            };

        	model.getAllBooks = function(){
                BookService.getAllBooks(
                function(books){
                    console.log('Retrieved all Books');
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

