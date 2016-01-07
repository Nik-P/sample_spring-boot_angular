'use strict';

/* @ngInject */
angular.module('booksApp.books', 
['ui.router',
 'ngResource']
)

.config(function ($stateProvider) {
    $stateProvider.state('books', {
        url: '/books?view',
        views: {
            'main': {
                controller: 'BooksCtrl as model',
                templateUrl: 'front_end_src/main/js/books/books.html'
            }
        },
        data:{ pageTitle: 'Books' }
    });
});