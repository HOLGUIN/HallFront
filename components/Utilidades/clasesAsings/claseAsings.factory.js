(function () {

    'use strict';

    angular
        .module('app.clasesAsings')
        .factory('clasesAsingsFactory', clasesAsingsFactory);

        clasesAsingsFactory.$inject = ['API_URL', '$http', '$q'];

    function clasesAsingsFactory(API_URL, $http, $q) {
        return {
            getClasesAsings: getClasesAsings
        };

        function getClasesAsings(id, fecha) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/ClasesAsg',
                    method: "Get",
                    params: {
                        id : id
                    },
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