(function () {
    'use strict';

    angular
        .module('app.header')
        .factory('appHeaderFactory', appHeaderFactory);

    appHeaderFactory.$inject = ['API_URL', '$http', '$q'];

    function appHeaderFactory(API_URL, $http, $q) {

        return {
            updatePassword: updatePassword
        };

        function updatePassword(id, changes) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Login/' + id,
                    method: 'PUT',
                    data: changes,
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

        };

    };

} ());