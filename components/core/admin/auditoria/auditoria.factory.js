(function () {
    'use strict';

    angular
        .module('app.admin.auditoria')
        .factory('auditoriaFactory', auditoriaFactory);

    auditoriaFactory.$inject = ['API_URL_ADMIN', '$http', '$q'];

    function auditoriaFactory(API_URL_ADMIN, $http, $q) {

        return {
            createAuditoria: createAuditoria,
        //    getAuditorias: getAuditorias,
            getAuditoria: getAuditoria,
            
            
            updateAuditoria: updateAuditoria                                    
        };

        function getAuditoria(id) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/auditoria/' + id,
                    method: 'GET'
                })
                    .then(function (promise) {                        
                        resolve(promise.data);
                    }, function (reason) {                        
                        reject(reason);
                    });

            });

        }

        function createAuditoria(auditoria) {

            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/auditoria',
            //         method: 'POST',
            //         data: auditoria,
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //         .then(function (promise) {
            //             resolve(promise);
            //           //  console.log('response promise create auditoria');
            //           //  console.log(promise);

            //         }, function (reason) {
            //             reject(reason);
            //         });

            // });

        }

        function updateAuditoria(id, user) {

            // console.log('id, user');
            // console.log(id);
            // console.log(user);
            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/auditoria/' + id,
            //         method: 'PUT',
            //         data: user,
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //         .then(function (promise) {
            //             resolve(promise);
            //            // console.log('promise--------');
            //            // console.log(promise);
            //         }, function (reason) {
            //             reject(reason);
            //             console.log('reason');
            //             console.log(reason);
            //         });

            // });
        }

        function getDocuments() {

            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/auditoriaPlantilla',
            //         method: 'GET'
            //     })
            //         .then(function (promise) {
            //           //  console.log('----success getDocuments****----');
            //             resolve(promise.data);
            //            // console.log(promise.data);
            //         }, function (error) {
            //             console.log('----error getDocuments----');
            //             reject({'auditoria error': error});
            //         });

            // });

        }

        function getDocument(auditoriaId) {

            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/auditoriaPlantilla/' + auditoriaId,
            //         method: 'GET'
            //     })
            //         .then(function (promise) {
            //             resolve(promise.data);
            //         }, function (reason) {
            //             console.log('----error getDocument----');
            //             reject(reason);
            //         });

            // });

        }

        function addTemplatesDocuments(data) {

            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/auditoriaPlantilla',
            //         method: 'POST',
            //         data: data,
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //         .then(function (promise) {
            //             resolve(promise);
            //         }, function (reason) {
            //             reject(reason);
            //         });

            // });

        }

        function deleteDocument(idDocument) {
            // return $q(function (resolve, reject) {
            //     $http({
            //         url: API_URL_ADMIN + '/auditoriaPlantilla/' + idDocument,
            //         method: 'DELETE',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }).then(function (promise) {
            //         resolve(promise);
            //     }, function (reason) {
            //         reject(reason);
            //     });
            // });
        }

        function getUsersTemplates(userId) {

            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/PlantillaUsuario/' + userId,
            //         method: 'GET'
            //     })
            //         .then(function (promise) {
            //             resolve(promise.data);
            //         }, function (reason) {
            //             console.log('----error getUsersTemplates----');
            //             reject(reason);
            //         });

            // });

        }

        function addUsersTemplates(data) {

            // return $q(function (resolve, reject) {

            //     $http({
            //         url: API_URL_ADMIN + '/plantillaUsuario',
            //         method: 'POST',
            //         data: data,
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //         .then(function (promise) {
            //             resolve(promise);
            //           //  console.log('response promise create addUsersTemplates');
            //           //  console.log(promise);

            //         }, function (reason) {
            //             reject(reason);
            //         });

            // });

        }

        function deleteUsersTemplates(plantillausuarioid) {
            // return $q(function (resolve, reject) {
            //     $http({
            //         url: API_URL_ADMIN + '/plantillaUsuario/' + plantillausuarioid,
            //         method: 'DELETE',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }).then(function (promise) {
            //         resolve(promise);
            //     }, function (reason) {
            //         reject(reason);
            //     });
            // });
        }

    }

}());