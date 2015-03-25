/**
 * activities Module
 *
 * Paris API service
 */
angular.module('activities.services', [])

	.factory('ActivitiesService', function($http){

		return {

			get_categories: function(cb){
				$http
					.get('https://api.paris.fr/api/data/1.0/Equipements/get_categories/?token=9127a98dbdf42ad085f3d9f97dd0d301a3e12bb530798f441d83dc49cb8e2672')
					.success(function(res){
						cb(res);
						
					})
					.error(function(res){

					});
			},

			get_equipments: function(id, cb){
				$http
					.get('https://api.paris.fr/api/data/1.1/Equipements/get_equipements/?token=9127a98dbdf42ad085f3d9f97dd0d301a3e12bb530798f441d83dc49cb8e2672&offset=0&limit=10&cid='+ id)
					.success(function(res){
						cb(res);
						
					})
					.error(function(res){

					});
			},
			get_equipment: function(id, cb){
				$http
					.get('https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?token=9127a98dbdf42ad085f3d9f97dd0d301a3e12bb530798f441d83dc49cb8e2672&id='+ id)
					.success(function(res){
						cb(res);
						
					})
					.error(function(res){

					});
			},

			get_geo_equipments: function(id, lat, lon, radius, cb){
				$http
					.get('https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/?token=9127a98dbdf42ad085f3d9f97dd0d301a3e12bb530798f441d83dc49cb8e2672&cid='+id+'&offset=0&limit=50&lat='+lat+'&lon='+lon+'&radius='+ radius)
					.success(function(res){
						cb(res);
						
					})
					.error(function(res){

					});
			}

		};

	})

	.factory('FavoriteService', function(){

		var favorites;

		return {
			getAll: function(){
				favorites = localStorage.getItem('activities.favorites');
				return (favorites) ? JSON.parse(favorites) : [];
			}
		};

	});