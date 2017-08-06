(function () {
    'use strict';

    angular
        .module('app.admin.companies.users')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = ['API_URL_ADMIN', '$http', '$q'];

    function usersFactory(API_URL_ADMIN, $http, $q) {

        return {
            createUser: createUser,
            getUser: getUser,
            updateUser: updateUser
        };

        function createUser(users) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/users',
                    method: 'POST',
                    data: users,
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


        function getUser(id) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/users/' + id,
                    method: 'GET'
                })
                    .then(function (promise) {
                        resolve(promise.data);
                    }, function (reason) {
                        console.log('----error getUser----');
                        reject(reason);
                    });

            });

        }

        function updateUser(id, user) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/users/' + id,
                    method: 'PUT',
                    data: user,
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


    }

}());