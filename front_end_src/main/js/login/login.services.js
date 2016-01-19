'use strict';

/* @ngInject */
angular.module('booksApp.login')


.factory('sessionService', function($http) {
    var session = {};
    session.login = function(data) {
        return $http.post('/basic-web-app/login', 'email=' + data.email +
        '&password=' + data.password, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        } ).then(function(data) {
            alert('login successful');
            localStorage.setItem('session', {});
        }, function(data) {
            alert('error logging in');
        });
    };
    session.logout = function() {
        localStorage.removeItem('session');
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