"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("moduleController", function($scope, $http) {
    $http.get("/modules").then(function(response) {
      $scope.modules = response.data;
    });
    // Sends a delete message to the server
    $scope.deleteModule = function(code) {
      // Send delete message to /module/code
      $http.delete("/module/" + code).then(function(response) {
        // When request completes, refresh list of modules
        $http.get("/modules").then(function(response) {
          $scope.modules = response.data;
        });
      });
    };
  
    $scope.new_module = new Module("", "");
  
    // Sends a put message to the server
    $scope.createModule = function() {
      // Send post message to /modules
      $http.post("/modules", $scope.new_module).then(function(response) {
        // When request completes, reset new_module
        $scope.new_module = new Module("", "");
        // Then refresh list of modules
        $http.get("/modules").then(function(response) {
          $scope.modules = response.data;
        });
      });
    };
  });