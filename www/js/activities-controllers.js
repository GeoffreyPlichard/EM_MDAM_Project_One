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
		})
	});