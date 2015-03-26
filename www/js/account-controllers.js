var app = angular.module('user', []);
app.controller('usersCtrl', function($scope, $http) {
    $http.get("../js/data.json")
    .success(function(response) {$scope.names = response;});
});