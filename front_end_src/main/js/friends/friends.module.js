'use strict';

/* @ngInject */
angular.module('booksApp.friends', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('friends', {
        url: '/friends',
        views: {
            'main': {
                controller: 'FriendsCtrl as model',
                templateUrl: 'front_end_src/main/js/friends/friends.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
});