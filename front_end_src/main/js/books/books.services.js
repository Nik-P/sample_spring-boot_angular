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