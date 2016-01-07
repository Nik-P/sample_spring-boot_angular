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