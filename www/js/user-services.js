angular.module('user.services', [])

.factory('User', function($http,$ionicLoading) {

  return {
    addInfos : function(q){
        $ionicLoading.show({ template: 'Traitement des données...' });
        alert(q);
    },
    getInfos : function(){
        
    }
  }
});