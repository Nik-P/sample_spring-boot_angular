'use strict';

/* @ngInject */
angular.module('booksApp.notifications', 
[]
)

.config(function ($stateProvider) {
    $stateProvider.state('notifications', {
        url: '/notifications',
        views: {
            'main': {
                controller: 'NotificationsCtrl as model',
                templateUrl: 'front_end_src/main/js/notifications/notifications.html'
            }
        },
        data:{ pageTitle: 'User notifications' }
    });
});