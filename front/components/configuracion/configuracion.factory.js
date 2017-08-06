(function () {

    'use strict';

    angular
        .module('app.configuracion')
        .factory('ConfigFactory', ConfigFactory);

    ConfigFactory.$inject = ['API_URL', '$http', '$q'];

    function ConfigFactory(API_URL, $http, $q) {
        return {
            getConfig: getConfig,
            putConfig : putConfig
        };



        function getConfig() {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Config',
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


       function putConfig(modelo) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Config',
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


    }
}());