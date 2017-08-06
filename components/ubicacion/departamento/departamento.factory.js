(function () {

    'use strict';

    angular
        .module('app.ubicacion.departamento')
        .factory('DepartamentoFactory',DepartamentoFactory);

    DepartamentoFactory.$inject = ['API_URL', '$http', '$q'];

    function DepartamentoFactory(API_URL, $http, $q) {
        return {
            getDept: getDept,
            getDepts: getDepts,
            crearDept: crearDept,
            editarDept: editarDept,
            deleteDept: deleteDept,
        };

        

        function getDepts() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Departamento',
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


        function getDept(id) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Departamento',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { hlndepartamentoid: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })

            });
        }


        function crearDept(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve", resolve)
                console.log("reject", reject);
                $http({
                    url: API_URL + '/api/Departamento',
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

        function editarDept(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Departamento',
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

        function deleteDept(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Departamento',
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