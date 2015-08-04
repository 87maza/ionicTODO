// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function() {
  var app = angular.module('mynotes', ['ionic', 'mynotes.notestore']);

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    $stateProvider.state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    });

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    });

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    });

    $urlRouterProvider.otherwise('/list');
  });

  app.controller('HomeCtrl', function($scope) {

  });

  app.controller('ListCtrl', function($scope, NoteStore) {

    $scope.reordering = false;
    $scope.notes = NoteStore.list();

    $scope.remove = function(noteId) {
      NoteStore.remove(noteId);
    };
    $scope.move = function(note, fromIndex, toIndex) {
      NoteStore.move(note, fromIndex, toIndex);
    };

    $scope.toggleReordering = function() {
      $scope.reordering = !$scope.reordering;
    };
  });

  app.controller('AddCtrl', function($scope, $state, NoteStore) {
    $scope.note = {
      id: new Date().getTime().toString(),
      title: '',
      description: ''
    }; 
    $scope.save = function() {
      NoteStore.create($scope.note);
      $state.go('list');
    }; 
  });

  app.controller('EditCtrl', function($scope, $state, NoteStore) {

    $scope.note = angular.copy(NoteStore.get($state.params.noteId));

    $scope.save = function() {
      NoteStore.update($scope.note);
      $state.go('list');
    }; 
  });


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}());