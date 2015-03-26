/**
 * activities.controllers Module
 *
 * Paris API Controllers
 */
angular.module('activities.controllers', [])


	.controller('ActivitiesCtrl', function($scope, $http, ActivitiesService, SelectionService){

		// Get localStorage settings
		var favorites_equipments = JSON.parse(localStorage.getItem('activities.favorites'));
		var equipment_ids = [];
		if(favorites_equipments){
			for (var i = 0; i < favorites_equipments.length; i++){
				equipment_ids.push(favorites_equipments[i].idcategories);

			}
		}

		var onSuccess = function(position) {

			console.log('Latitude: '          + position.coords.latitude          + '\n' +
		          'Longitude: '         + position.coords.longitude         + '\n' +
		          'Altitude: '          + position.coords.altitude          + '\n' +
		          'Accuracy: '          + position.coords.accuracy          + '\n' +
		          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		          'Heading: '           + position.coords.heading           + '\n' +
		          'Speed: '             + position.coords.speed             + '\n' +
		          'Timestamp: '         + position.timestamp                + '\n');


			ActivitiesService.get_geo_equipments(equipment_ids, position.coords.latitude, position.coords.longitude, 500, function(res){
				$scope.equipments = res.data;
				console.log($scope.equipments);

				$scope.selections =SelectionService.getAll();

				for (var i = 0; i < $scope.selections.length; i++){
					for (var j = 0; j < $scope.equipments.length; j++){
						if($scope.selections[i].equipment.idequipements == $scope.equipments[j].id){
							$scope.equipments[j].selected = true;
						}
					}
				}
			});
		};
		
		function onError(error) {
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);

	})


	.controller('EquipmentsCtrl', function($scope,$ionicModal, $stateParams, ActivitiesService, SelectionService){

		ActivitiesService.get_equipment($stateParams.equipmentId, function(res){
			var equipment_tmp = res.data;
			$scope.equipment = equipment_tmp[0];

		});

		$ionicModal.fromTemplateUrl('date-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });

		$scope.openModal = function() {
			$scope.modal.show();
		};

		$scope.addToSelection = function(form, equipment){
			var selection = {
				equipment 	: equipment,
				date 		: form.selection.date,
				start 		: form.selection.start,
				end 		: form.selection.end
			};
			SelectionService.add(selection);
		};

		
	})

	.controller('SelectionCtrl', function($scope, SelectionService){
		$scope.selections = SelectionService.getAll();
	})

	.controller('SettingsCtrl', function($scope, $ionicModal, ActivitiesService, FavoriteService, $ionicPopup){

		$scope.favorites = FavoriteService.getAll();

		// Get all categories
		ActivitiesService.get_categories(function(res){
			$scope.all_activities = res.data;
			// Check categories according to favorites categories
			for (var i = 0; i < $scope.favorites.length; i++){
				for (var j = 0; j < $scope.all_activities.length; j++){
					if($scope.favorites[i].idcategories == $scope.all_activities[j].idcategories){
						$scope.all_activities[j].checked = true;

					}
				}
			}
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
			// Array to store categories objects
			var favorites_activities = [];
			for (var i = 0; i < $scope.all_activities.length; i++){
				if($scope.all_activities[i].checked){
					favorites_activities.push($scope.all_activities[i]);
					// Save array in localStorage
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