(function () {

    'use strict';

    angular.module('app.asignatura.tema').factory('temaFactory', temaFactory);

    temaFactory.$inject = ['API_URL', '$http', '$q'];

    function temaFactory(API_URL, $http, $q) {
        return {
            getTema: getTema,
            getTemas: getTemas,
            crearTema: crearTema,
            editarTema: editarTema,
            deleteTema: deleteTema,
            getTemasListas: getTemasListas
        };


        function getTemas() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Tema',
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


        function getTemasListas(listasok) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Tema',
                    method: "Get",
                    params: { listasok: listasok },
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


        function getTema(id) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Tema',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { hlntemaid: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })

            });
        }


        function crearTema(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve", resolve)
                console.log("reject", reject);
                $http({
                    url: API_URL + '/api/Tema',
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

        function editarTema(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Tema',
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

        function deleteTema(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Tema',
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