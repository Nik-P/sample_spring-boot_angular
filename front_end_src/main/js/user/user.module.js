'use strict';

/* @ngInject */
angular.module('booksApp.user', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        views: {
            'main': {
                controller: 'UserCtrl as model',
                templateUrl: 'front_end_src/main/js/user/user.html'
            }
        },
        data:{ pageTitle: 'Profile' }
    });
});