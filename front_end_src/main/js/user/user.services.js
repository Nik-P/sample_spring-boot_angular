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
            {'query': {method: 'GET', isArray: true, headers:{'Content-Type':'charset=UTF-8'} }});
            var data = temp.query();
            data.$promise.then( function() {
                //var books = data.content;
                success( data );
            });
        };

        return service;
    });