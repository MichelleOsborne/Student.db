"use strict";

// Get the mainApp
var mainApp = angular.module("mainApp", []);

// Create the controller
mainApp.controller("programmeController", function($scope, $http) {
    document.getElementById("selected").style.display = "none";
  
    $http.get("/programmes").then(function(response) {
      $scope.programmes = response.data;
    });
    $scope.new_programme = new Programme("", "");

    // Sends a post message to the server
    $scope.createProgramme = function() {
      // Send a post message to the server
      $http.post("/programmes", $scope.new_programme).then(function(response) {
        // Reset new_programme
        $scope.new_programme = new Programme("", "");
        // Refresh list of programmes
        $http.get("/programmes").then(function(response) {
          $scope.programmes = response.data;
        });
      });
    };
    $scope.selectProgramme = function(code) {
      $http.get("/programme/" + code).then(function(response) {
        $scope.selectedProgramme = response.data;
        document.getElementById("selected").style.display = "block";
      });
    };
  
    $scope.deleteProgramme = function(code) {
      // Send delete message to the server
      $http.delete("/programme/" + code).then(function(response) {
        // When delete complete, refresh the list of programmes
        $http.get("/programmes/").then(function(response) {
          $scope.programmes = response.data;
        });
      });
    };
  });