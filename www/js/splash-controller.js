angular.module('camera.controllers', [])

.controller('SplashCtrl', function($scope, $location, Camera, $rootScope, $ionicLoading){
    
     $scope.getPhoto = function() {

        Camera.getPicture(function(res){
            $rootScope.data_picture = res.face[0].attribute;
            $rootScope.data_picture_url = res.url;
            $scope.$apply(function() {  
                $location.path('/signupInfos'); 
            });

        });
    };
    console.log($scope.data_picture_url);
    console.log($scope.data_picture);
     
})
.controller('SignupInfoCtrl', function($scope, $rootScope, $ionicLoading){
    $ionicLoading.hide();
    console.log($rootScope.data_picture_url);
    console.log($rootScope.data_picture);
});
