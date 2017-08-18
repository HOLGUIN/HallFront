(function () {

    'use strict';

    angular
        .module('app.ubicacion.pais')
        .factory('PaisFactory',PaisFactory);

    PaisFactory.$inject = ['API_URL', '$http', '$q'];

    function PaisFactory(API_URL, $http, $q) {
        return {
            getPais: getPais,
            getPaises: getPaises,
            crearPais: crearPais,
            editarPais: editarPais,
            deletePais: deletePais
        };

        function getPaises() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Pais',
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

        function getPais(id) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Pais',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { hlnpaisid: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })

            });
        }

        function crearPais(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve", resolve)
                console.log("reject", reject);
                $http({
                    url: API_URL + '/api/Pais',
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

        function editarPais(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Pais',
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

        function deletePais(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Pais',
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