(function () {

    'use strict';

    angular
        .module('app.ubicacion.ciudad')
        .factory('CiudadFactory',CiudadFactory);

    CiudadFactory.$inject = ['API_URL', '$http', '$q'];

    function CiudadFactory(API_URL, $http, $q) {
        
        return {
            getCiudad: getCiudad,
            getCiudades: getCiudades,
            crearCiudad: crearCiudad,
            editarCiudad: editarCiudad,
            deleteCiudad: deleteCiudad
        };

        

        function getCiudades() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Ciudad',
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


        function getCiudad(id) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Ciudad',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { hlnciudadid: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })

            });
        }


        function crearCiudad(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve", resolve)
                console.log("reject", reject);
                $http({
                    url: API_URL + '/api/Ciudad',
                    method: "POST",
                    data: modelo,
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

        function editarCiudad(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Ciudad',
                    method: "PUT",
                    data: modelo,
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

        function deleteCiudad(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Ciudad',
                    method: "Delete",
                    data: modelo,
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