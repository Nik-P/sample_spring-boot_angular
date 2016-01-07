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