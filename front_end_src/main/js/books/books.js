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

