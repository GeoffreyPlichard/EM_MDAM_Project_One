angular.module('camera.services', [])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function() {

        navigator.camera.getPicture(onSuccess, onFail, {quality: 50,destinationType: Camera.DestinationType.DATA_URL});
        
        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;            
            
            var api = new FacePP('2b5858e6f0a840974a8c782fbfbae118',
                     '5XsDRVCSFe0-kL688_8GwlcfxSZ4h311',
                     { apiURL: 'http://apius.faceplusplus.com/v2' });
            
            

                    $.ajax({
                        url: 'https://api.imgur.com/3/image',
                        headers: {
                            'Authorization': 'Client-ID be1b1e6bf60404c'
                        },
                        type: 'POST',
                        data: {
                            'image': imageData,
                            'type': 'base64'
                        },
                        success: function(response) {
                           
                            api.request('detection/detect', {
                              url:  response.data.link
                            }, function(err, result) {
                              if (err) {
                                $('#response').text('Load failed.');
                                return;
                              }
                              $('#response').text(JSON.stringify(result));
                            });
                            
                        }, error: function() {
                            alert("Error while uploading...");
                        }
                    });
            
            
            
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }
  }
}]);