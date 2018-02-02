(function () {

    'use strict';

    angular
        .module('app.clase.alumno')
        .factory('ClaseFactory', ClaseFactory);

        ClaseFactory.$inject = ['API_URL', '$http', '$q'];

    function ClaseFactory(API_URL, $http, $q) {
        return {

        };

    }
}());