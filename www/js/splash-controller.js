angular.module('camera.controllers', [])

.controller('SplashCtrl', function($scope, $state, $location, $window, Camera, $rootScope, $ionicLoading, $ionicPopup){
    $rootScope.accountExist = localStorage.getItem("user.ownData");
    $scope.showConfirm = function() { 
           var confirmPopup = $ionicPopup.confirm({
             title: "C'est l'heure de prendre une photo de vous !"
           });
           confirmPopup.then(function(res) {
             if(res) {
               $scope.getPhoto();
             }
           });
     };
    
    $scope.checkAccount = function() {
        if($rootScope.accountExist != undefined && $rootScope.accountExist != "" && $rootScope.accountExist != null){
            $state.go('app.activities'); 
        }else{
            $scope.confirmCheckAccount = function() {
               var confirmPopup = $ionicPopup.confirm({
                 title: "Compte introuvable, en créer un ??"
               });
               confirmPopup.then(function(res) {
                 if(res) {
                   $scope.getPhoto();
                 }
               });
            };
            $scope.confirmCheckAccount();
        }
    };
    
    $scope.deleteAccount = function(){
        localStorage.clear();  
         $window.location.reload();
    };
    
     $scope.getPhoto = function() {

        Camera.getPicture(function(res){
            $rootScope.data_picture = res.face[0].attribute;
            $rootScope.data_picture_url = res.url; 
                
            $ionicLoading.hide();
            $state.go('signup');

        });
    };
     
})
.controller('SignupInfoCtrl', function($scope, $rootScope, $location, $ionicLoading, $state){
    $ionicLoading.hide();
    $scope.formUser = {};
    $scope.formUser.age = $rootScope.data_picture.age.value;
    $scope.formUser.sexe = $rootScope.data_picture.gender.value;
    $scope.formUser.ethnie = $rootScope.data_picture.race.value;
    
    
     $scope.addInfos = function(formUser){
        $ionicLoading.show({ template: 'Traitement des données...' });
        localStorage.setItem("user.ownData",JSON.stringify($scope.formUser));
        localStorage.setItem("user.profilePicture",$rootScope.data_picture_url);
        $ionicLoading.hide();
        $state.go('signupActivities');
    },
    $scope.getInfos = function() {
        var data = localStorage.getItem("user.ownData");
    }
    
    $scope.search = function() {
        $scope.addInfos($scope.formUser);
    };
});
