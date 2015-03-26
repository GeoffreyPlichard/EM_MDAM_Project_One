angular.module('camera.services', [])

.factory('Camera', function($http,$ionicLoading) {

  return {
    getPicture: function(callback) {
        
        navigator.camera.getPicture(onSuccess, onFail, {quality: 50,destinationType: Camera.DestinationType.DATA_URL});
        $ionicLoading.show({ template: 'Recherche...' });
        function onSuccess(imageData) {
  
            var api = new FacePP('2b5858e6f0a840974a8c782fbfbae118',
                     '5XsDRVCSFe0-kL688_8GwlcfxSZ4h311',
                     { apiURL: 'http://apius.faceplusplus.com/v2' });
            
                var req = {
                 method: 'POST',
                 url: 'https://api.imgur.com/3/image',
                 headers: {
                   'Authorization': 'Client-ID be1b1e6bf60404c'
                 },
                 data: { 'image': imageData,
                          'type': 'base64' }
                }
              
                $http(req).success( function(response) {
                           
                            api.request('detection/detect', {
                              url:  response.data.link,
                              attribute:'gender,race,age,smiling'
                            }, function(err, result) {
                              if (err) {
                                alert('Load failed.');
                                return;
                              }
                              callback(result);
                            });
                            
                        }). error( function() {
                            alert("Error while uploading...");
                        });
                    
            
            
            
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }
  }
});