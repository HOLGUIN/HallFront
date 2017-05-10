(function () {

    'use strict';

    angular
        .module('app.programar')
        .factory('ProgramFactory',ProgramFactory);

    ProgramFactory.$inject = ['API_URL', '$http', '$q'];

    function ProgramFactory(API_URL, $http, $q) {
        
        return {
            getProgramas: getProgramas 
        };

        

        function getProgramas() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Programar',
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