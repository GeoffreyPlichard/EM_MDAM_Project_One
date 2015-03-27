angular.module('users.services', [])

	.factory('UsersService', function($http, $ionicLoading){

		return {

			get_users: function(cb){
				$http
					.get('../js/data.json')
					.success(function(res){
						cb(res);
						
					})
					.error(function(res){

					});
			}
		}
	});
