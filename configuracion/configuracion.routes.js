//Routes
(function () {
    'use strict';

    angular
        .module('app.configuracion')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.configuracion', {
                url: '/Configuracion',
                templateUrl: 'components/configuracion/configuracion.view.html',
                controller: 'ConfigController',
                controllerAs: '$ctrl'
            });
    }

}());
