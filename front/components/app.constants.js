(function () {
    'use strict';

    angular.module('app.constants', [])
         //constantes de la aplicacion para apuntar al backend
        .constant('API_URL', 'http://localhost:61122')
        .constant('API_URL_ADMIN', 'http://localhost:55594/admin');

}());
