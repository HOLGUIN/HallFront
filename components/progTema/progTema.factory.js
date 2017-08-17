(function () {

    'use strict';

    angular
        .module('app.progtema')
        .factory('ProgTemaFactory',ProgTemaFactory);

    ProgTemaFactory.$inject = ['API_URL', '$http', '$q'];

    function ProgTemaFactory(API_URL, $http, $q) {
        
        return {
            getProgTemas: getProgTemas,
            getProgTema: getProgTema,
            crearProgTema: crearProgTema,
            editarProgTema: editarProgTema,
            deleteProgTema: deleteProgTema
        };

        function getProgTemas() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/progtema',
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

        function getProgTema(id) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/ProgTema',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { hlnprogtemaid: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })
            });
        }


        function crearProgTema(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve", resolve)
                console.log("reject", reject);
                $http({
                    url: API_URL + '/api/ProgTema',
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

        function editarProgTema(modelo) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/ProgTema',
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

        function deleteProgTema(modelo) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/ProgTema',
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