(function () {
    'use strict';

    angular
        .module('app.admin.companies')
        .factory('companiesFactory', companiesFactory);

    companiesFactory.$inject = ['API_URL_ADMIN', '$http', '$q'];

    function companiesFactory(API_URL_ADMIN, $http, $q) {

        return {
            createCompany: createCompany,
            updateCompany: updateCompany,
            getDocuments: getDocuments,
            addTemplatesDocuments: addTemplatesDocuments,
            deleteDocument: deleteDocument,
            getDocument: getDocument,
            addUsersTemplates: addUsersTemplates,
            deleteUsersTemplates: deleteUsersTemplates,
            getUsersTemplates: getUsersTemplates
        };

        function createCompany(companies) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/empresa',
                    method: 'POST',
                    data: companies,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (promise) {
                        resolve(promise);
                      //  console.log('response promise create companies');
                      //  console.log(promise);

                    }, function (reason) {
                        reject(reason);
                    });

            });

        }

        function updateCompany(id, user) {

            console.log('id, user');
            console.log(id);
            console.log(user);
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/empresa/' + id,
                    method: 'PUT',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (promise) {
                        resolve(promise);
                       // console.log('promise--------');
                       // console.log(promise);
                    }, function (reason) {
                        reject(reason);
                        console.log('reason');
                        console.log(reason);
                    });

            });
        }

        function getDocuments() {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/empresaPlantilla',
                    method: 'GET'
                })
                    .then(function (promise) {
                      //  console.log('----success getDocuments****----');
                        resolve(promise.data);
                       // console.log(promise.data);
                    }, function (error) {
                        console.log('----error getDocuments----');
                        reject({'companies error': error});
                    });

            });

        }

        function getDocument(companyId) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/empresaPlantilla/' + companyId,
                    method: 'GET'
                })
                    .then(function (promise) {
                        resolve(promise.data);
                    }, function (reason) {
                        console.log('----error getDocument----');
                        reject(reason);
                    });

            });

        }

        function addTemplatesDocuments(data) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/empresaPlantilla',
                    method: 'POST',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (promise) {
                        resolve(promise);
                    }, function (reason) {
                        reject(reason);
                    });

            });

        }

        function deleteDocument(idDocument) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL_ADMIN + '/empresaPlantilla/' + idDocument,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                });
            });
        }

        function getUsersTemplates(userId) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/PlantillaUsuario/' + userId,
                    method: 'GET'
                })
                    .then(function (promise) {
                        resolve(promise.data);
                    }, function (reason) {
                        console.log('----error getUsersTemplates----');
                        reject(reason);
                    });

            });

        }

        function addUsersTemplates(data) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/plantillaUsuario',
                    method: 'POST',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (promise) {
                        resolve(promise);
                      //  console.log('response promise create addUsersTemplates');
                      //  console.log(promise);

                    }, function (reason) {
                        reject(reason);
                    });

            });

        }

        function deleteUsersTemplates(plantillausuarioid) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL_ADMIN + '/plantillaUsuario/' + plantillausuarioid,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                });
            });
        }

    }

}());