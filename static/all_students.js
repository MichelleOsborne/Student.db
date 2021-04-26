"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("studentController", function($scope, $http) {
    document.getElementById("selected").style.display = "none";
  
    $http.get("/students").then(function(response) {
      $scope.students = response.data;
    });
  
    $scope.selectStudent = function(id) {
      $http.get("/student/" + id).then(function(response) {
        $scope.selectedStudent = response.data;
        document.getElementById("selected").style.display = "block";
      });
    };
  
    $scope.deleteStudent = function(id) {
      // Send delete message to the server
      $http.delete("/student/" + id).then(function(response) {
        // When server responds, referesh the list of students
        $http.get("/students").then(function(response) {
          $scope.students = response.data;
        });
      });
    };
  });