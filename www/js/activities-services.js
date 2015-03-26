/**
 * activities Module
 *
 * Paris API service
 */
angular.module('activities.services', [])
	.factory('ActivitiesService', function($http, $ionicLoading){
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
				$ionicLoading.show({ template: 'Recherche...' });
				$http
					.get('https://api.paris.fr/api/data/1.1/Equipements/get_equipements/?token=9127a98dbdf42ad085f3d9f97dd0d301a3e12bb530798f441d83dc49cb8e2672&offset=0&limit=10&cid='+ id)
					.success(function(res){
						$ionicLoading.hide();
						cb(res);
						
					})
					.error(function(res){
					});
			},
			get_equipment: function(id, cb){
				$ionicLoading.show({ template: 'Recherche...' });
				$http
					.get('https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?token=9127a98dbdf42ad085f3d9f97dd0d301a3e12bb530798f441d83dc49cb8e2672&id='+ id)
					.success(function(res){
						$ionicLoading.hide();
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
			},
			getRay: function(){
				ray = localStorage.getItem('activities.ray');
				return ray || 500;
			},
			addRay: function(ray){
				localStorage.setItem('activities.ray', ray);
			}
		};
	})
	.factory('SelectionService', function(){
		var selection;
		return {
			getAll: function(){
				selections = localStorage.getItem('activities.selection');
				return (selections) ? JSON.parse(selections) : [];
			},
			add: function(item){
				// this.remove(item);
				selection = this.getAll();
				selection.push(item);
				localStorage.setItem('activities.selection', JSON.stringify(selection));
			}/*,
			remove : function(item) {
		      selections = this.getAll();
		      for (var i = 0, len = selections.length; i < len; ++i) {
		        if (selections[i].id === item.id) {
		          selections.splice(i, 1);
		          break;
		        }
		      }
		      // ... sauvegarde en localStorage
		      localStorage.setItem('activities.selection', JSON.stringify(selections));
		    },*/
		};
	});