(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoginFactory', LoginFactory);

    LoginFactory.$inject = ['$http', 'API_URL', 'AuthTokenFactory', '$q'];

    function LoginFactory($http, API_URL, AuthTokenFactory, $q) {

        return {

            login: login,
            logout: logout,
            getUser: getUser,
            recovery: recovery,
            sendUrlToken: sendUrlToken,
            updatePassword: updatePassword

        };

        function login(username, password) {

            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/login',
                    method: 'Get',
                    params: {
                        "usuario": username,
                        "clave": password
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    resolve(response.data);
                    AuthTokenFactory.setToken(response.data);
                }, function (reason) {
					console.log(reason);
                    reject(reason);
                })
            });
        }

        function logout() {

            $http.defaults.headers.common.Authorization = '';
            AuthTokenFactory.setToken();
        }

        function getUser() {
            if (AuthTokenFactory.getToken()) {
                console.log('authorize');
                return $http.get(API_URL + '/app');
            } else {
                return $q.reject({data: 'client hasn\'t auth token'});
            }
        }

        function recovery(email) {

            return $http({
                url: API_URL + '/user/recovery-password/',
                method: 'POST',
                data: {
                    "email": email
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
             //   console.log('--- recovery ---');
                //AuthTokenFactory.setToken(response.data.auth_token);
                // and then we'll return the response for future items in the chain.
                return response;
            });

        }

        function sendUrlToken(token) {

            return $http({
                url: API_URL + '/user/check-recovery-token',
                method: 'POST',
                params: {
                    "token": token
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
               // console.log('--- sendUrlToken ---');
                return response
            });

        }

        function updatePassword(newPassword) {

            return $http({
                url: API_URL + '/user/update-password',
                method: 'PUT',
                data: {
                    "password": newPassword
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                //console.log('update password');
                return response;
            });

        }

    }
})();