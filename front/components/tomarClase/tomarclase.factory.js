(function () {

    'use strict';

    angular
        .module('app.tomarclase')
        .factory('PTemaFactory',PTemaFactory);

    PTemaFactory.$inject = ['API_URL', '$http', '$q'];

    function PTemaFactory(API_URL, $http, $q) {
        
        return {
            startserver: startserver
        };

        

        function startserver() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Serverws',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })

            });
        }





 

      
    }
}());