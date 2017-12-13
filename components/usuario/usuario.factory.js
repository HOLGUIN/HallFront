(function () {

    'use strict';

    angular
        .module('app.usuario')
        .factory('UsuarioFactory',UsuarioFactory);

    UsuarioFactory.$inject = ['API_URL', '$http', '$q'];

    function UsuarioFactory(API_URL, $http, $q) {
        
        return {
            getUsuario: getUsuario,
            getUsuarios: getUsuarios,
            crearUsuario: crearUsuario,
            editarUsuario: editarUsuario,
            deleteUsuario: deleteUsuario,
            editPassword: editPassword
        };

        

        function getUsuarios() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/usuario',
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


        function getUsuario(id) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/usuario',
                    method: "Get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { id: id }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })

            });
        }


        function crearUsuario(modelo) {
            return $q(function (resolve, reject) {
                console.log("resolve", resolve)
                console.log("reject", reject);
                $http({
                    url: API_URL + '/api/usuario',
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

        function editarUsuario(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/usuario',
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



        function editPassword(password, hlnusuarioid) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/usuario',
                    method: "PUT",
                    params: {
                        password : password,
                        hlnusuarioid: hlnusuarioid
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


        function deleteUsuario(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/usuario',
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