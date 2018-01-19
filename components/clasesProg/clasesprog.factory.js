(function () {

    'use strict';

    angular
        .module('app.clasesprog')
        .factory('ClasesprogFactory', ClasesprogFactory);

    ClasesprogFactory.$inject = ['API_URL', '$http', '$q'];

    function ClasesprogFactory(API_URL, $http, $q) {
        return {

        };



    }
}());