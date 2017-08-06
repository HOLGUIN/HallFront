(function () {
    'use strict';

    angular
        .module('app.admin.profiles')
        .factory('profilesFactory', profilesFactory);

    profilesFactory.$inject = ['API_URL_ADMIN', '$http', '$q'];

    function profilesFactory(API_URL_ADMIN, $http, $q) {

        return {
            createProfile: createProfile,
            getProfiles: getProfiles,
            getProfile: getProfile,
            updateProfile: updateProfile,
            getPermissionProfile: getPermissionProfile,
            updatePermissionProfile: updatePermissionProfile
        };

        function createProfile(profile) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/perfiles',
                    method: 'POST',
                    data: profile,
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

        function getProfiles() {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/perfiles',
                    method: 'GET'
                }).then(function (promise) {
                        resolve(promise.data);
                    }, function (reason) {
                        reject(reason);
                    });
            });
        }

        function getProfile(id) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/perfiles/' + id,
                    method: 'GET'
                }).then(function (promise) {
                        resolve(promise.data);
                    }, function (reason) {
                        reject(reason);
                    });
            });
        }

        function updateProfile(id, profile) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/perfiles/' + id,
                    method: 'PUT',
                    data: profile,
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

        function getPermissionProfile(id) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/perfilpermiso/' + id,
                    method: 'GET'
                }).then(function (promise) {
                        resolve(promise.data);
                    }, function (reason) {
                        reject(reason);
                    });
            });
        }

        function updatePermissionProfile(id, profilePermission) {

            return $q(function (resolve, reject) {

                $http({
                    url: API_URL_ADMIN + '/perfilpermiso/' + id,
                    method: 'PUT',
                    data: profilePermission,
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