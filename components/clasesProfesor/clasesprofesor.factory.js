(function () {

    'use strict';

    angular
        .module('app.clasesprofesor')
        .factory('ClasesProfesorFactory', ClasesProfesorFactory);

    ClasesProfesorFactory.$inject = ['API_URL', '$http', '$q'];

    function ClasesProfesorFactory(API_URL, $http, $q) {
        return {

        };



    }
}());