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