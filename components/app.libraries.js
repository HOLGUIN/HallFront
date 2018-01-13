(function () {
    'use strict';

    // Inyecta las librerias de las directivas previamente instalas y que se van a utilizar
    angular.module('app.libraries', [
        'ui.router',
        'ui.bootstrap',
        'ngMaterial',
        'ngAnimate',
        'app.widgets',
        'datatables',
        'ui.select',
        'toastr',
        'pascalprecht.translate',
        'angular-google-analytics'
    ]);

}());