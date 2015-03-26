/**
 * profil.controller Module
 *
 * Profil Controllers
 */
angular.module('profil.controller', [])

.controller('ProfilCtrl', function($scope, $rootScope, $ionicLoading){

    if($rootScope.accountExist === undefined || $rootScope.accountExist === "" || $rootScope.accountExist === null){
        $rootScope.accountExist = JSON.parse(localStorage.getItem("user.ownData"));
    }

});