(function () {

    'use strict';

    angular
        .module('app.asignatura.materia')
        .factory('materiaFactory', materiaFactory);

    materiaFactory.$inject = ['API_URL', '$http', '$q'];

    function materiaFactory(API_URL, $http, $q) {
        return {
            getMaterias: getMaterias,
            getMateria: getMateria,
            crearMateria: crearMateria,
            editarMateria: editarMateria,
            deleteMateria: deleteMateria
        };

        function getMaterias() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Materia',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (promise) {
                    reject(promise);
                })
            });
        }

        function getMateria(id) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Materia',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { hlnmateriaid: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (promise) {
                    reject(promise);
                })

            });
        }

        function crearMateria(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve",resolve)
                console.log("reject",reject);
                $http({
                    url: API_URL + '/api/Materia',
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

        function editarMateria(modelo) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Materia',
                    method: "PUT",
                    data: modelo,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (promise) {
                    reject(promise);
                })
            });
        }

        function deleteMateria(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Materia',
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