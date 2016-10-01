'use strict'

angular.module('books')
.component('books',{
    templateUrl: 'components/books/books.template.html',
	controller: ['$http','$window','$rootScope', function StudentListController($http,$window,$rootScope) {
        var self = this;
        $http({
            method: 'GET',
            url: '/api/v1/books.json'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            self.books = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error: ' + response);
        });
        // self.studentDetail = function(index){
        //     //direct to student detail page
        //     console.log("student detail");
        //
        //     $http({
        //         method:'GET',
        //         url: '/list/' + self.students[index].id
        //     }).then(function successCallback(response) {
        //         // this callback will be called asynchronously
        //         // when the response is available
        //         $rootScope.student = response.data;
        //         $window.location.href = '/#!/list/' + self.students[index].id;
        //     }, function errorCallback(response) {
        //         // called asynchronously if an error occurs
        //         // or server returns response with an error status.
        //         console.log('error: ' + response);
        //     });
        //
        // };
        // self.addStudent = function(){
        //     //direct to add student page
        //     $window.location.href = '/#!/add';
        // }
    }]
});