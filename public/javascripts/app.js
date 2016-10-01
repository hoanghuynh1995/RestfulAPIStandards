'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'books'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/books',{
            template: '<books></books>'
        })
        .when('/books/:bookId',{
            template: '<book-detail></book-detail>'
        })
        .when('/books/add',{
            template:'<add-book></add-book>'
        })
        .otherwise({redirectTo: '/books'});
}]);
