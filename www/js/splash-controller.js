angular.module('camera.controllers', [])

.controller('SplashCtrl', function($scope, Camera, $http){
     $scope.getPhoto = function() {
        Camera.getPicture();
    };
     
});
