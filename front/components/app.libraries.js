(function () {
    'use strict';

    // Inyecta las librerias de las directivas previamente instalas y que se van a utilizar
    angular.module('app.libraries', [
        'ui.router',
        'ngMessages', 
        'ui.bootstrap',    
        'ngMaterial',
        'ngAnimate',
        'app.widgets',
        'datatables',
        'ngSanitize',
        'ui.select',
        'ngWebSocket'
    ]);

}());