/**
 * activities.controllers Module
 *
 * Paris API Controllers
 */
angular.module('activities.controllers', [])

	.controller('ActivitiesCtrl', function($scope, $http, ActivitiesService){

		ActivitiesService.get_categories(function(res){
			$scope.all_activities = res.data;

		});
		

	})

	.controller('EquipmentsCtrl', function($scope, $stateParams, ActivitiesService){
		ActivitiesService.get_equipments($stateParams.equipmentId, function(res){
			$scope.equipments = res.data;
		});
	})

	.controller('SettingsCtrl', function($scope, $ionicModal, ActivitiesService, FavoriteService, $ionicPopup){

		$scope.favorites = FavoriteService.getAll();

		ActivitiesService.get_categories(function(res){
			$scope.all_activities = res.data;
		});

		$ionicModal.fromTemplateUrl('my-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });

		$scope.openModal = function() {
			$scope.modal.show();
		};

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.save_categories = function(){
			var favorites_activities = [];
			for (var i = 0; i < $scope.all_activities.length; i++){
				if($scope.all_activities[i].checked){
					favorites_activities.push($scope.all_activities[i]);
					localStorage.setItem('activities.favorites', JSON.stringify(favorites_activities));
				}
			}
			$ionicPopup.alert({
		      title: 'Succès de l\'opération',
		      template: 'Catégories sauvegardées !'
		    });
			$scope.favorites = FavoriteService.getAll();
			$scope.closeModal();
		};
		
	});