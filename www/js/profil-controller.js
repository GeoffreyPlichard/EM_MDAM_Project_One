/**
 * profil.controller Module
 *
 * Profil Controllers
 */
angular.module('profil.controller', [])

.controller('ProfilCtrl', function($scope, $rootScope, $ionicLoading){
    alert($rootScope.data_picture_url);
    if($rootScope.accountExist === undefined || $rootScope.accountExist === "" || $rootScope.accountExist === null){
        $rootScope.accountExist = JSON.parse(localStorage.getItem("user.ownData"));
    }

});