'use strict';

/* @ngInject */
angular.module('booksApp.home', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            'main': {
                controller: 'HomeCtrl as model',
                templateUrl: 'front_end_src/main/js/home/home.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
});