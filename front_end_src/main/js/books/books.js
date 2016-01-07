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
                    model.getFriendBorrowRequests(1);
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

            model.getMyBorrowRequests = function(id){
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

