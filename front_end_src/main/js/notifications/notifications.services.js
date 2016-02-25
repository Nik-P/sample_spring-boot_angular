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