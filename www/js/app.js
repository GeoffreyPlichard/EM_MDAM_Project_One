// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'camera.controllers', 'camera.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('splashscreen', {
    url: "/",
    templateUrl: "templates/splashscreen.html",
    controller: 'SplashCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.activities', {
    url: "/activities",
    views: {
      'menuContent': {
        templateUrl: "templates/activities.html"
      }
    }
  })

  .state('app.activities-detail', {
    url: "/activities/activityId",
    views: {
      'menuContent': {
        templateUrl: "templates/activities-detail.html"
      }
    }
  })

  .state('app.selection', {
    url: "/selection",
    views: {
      'menuContent': {
        templateUrl: "templates/selection.html"
      }
    }
  })

  .state('app.selection-detail', {
    url: "/selection/selectionId",
    views: {
      'menuContent': {
        templateUrl: "templates/selection-detail.html"
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
