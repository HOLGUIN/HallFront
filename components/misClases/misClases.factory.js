(function () {

    'use strict';

    angular
        .module('app.misclases')
        .factory('claseFactory', claseFactory);

    claseFactory.$inject = ['API_URL', '$http', '$q'];

    function claseFactory(API_URL, $http, $q) {

        return {
            getClasesAlumnos: getClasesAlumnos,
            postClase: postClase
        };

        function getClasesAlumnos(hlnusuarioid) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Clase',
                    method: "Get",
                    params: {
                        alumnoid: hlnusuarioid
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

        function postClase(clase) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Clase',
                    method: "Post",
                    data: clase,
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