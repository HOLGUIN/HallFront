(function () {

    'use strict';

    angular
        .module('app.archivo')
        .factory('archivoFactory', archivoFactory);

    archivoFactory.$inject = ['API_URL', '$http', '$q'];

    function archivoFactory(API_URL, $http, $q) {
        return {
            postFile: postFile,
            getFiles: getFiles,
            DownloadFile: DownloadFile,
            deleteFile: deleteFile
        };

        function postFile(modelo, hlnclaseid) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Archivo',
                    method: "POST",
                    data: modelo.file,
                    params: {
                        hlnclaseid: modelo.hlnclaseid
                    },
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })
            });
        }



        function getFiles(hlnclaseid) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Archivo',
                    method: "GET",
                    params: {
                        hlnclaseid: hlnclaseid
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

        function DownloadFile(hlnarchivoid) {
            alert(hlnarchivoid);
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Archivo',
                    method: "GET",
                    params: {
                        hlnarchivoid: hlnarchivoid
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


        function deleteFile(hlnarchivoid) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Archivo',
                    method: "Delete",
                    params: { hlnarchivoid: hlnarchivoid },
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