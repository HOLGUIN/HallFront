//Routes
(function () {
    'use strict';

    angular
        .module('app.ubicacion.ciudad')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.ubicacion.ciudad',{
                url: '/ciudades',            
                templateUrl: 'components/ubicacion/ciudad/ciudad.view.html',
                controller: 'CiudadController',
                controllerAs: '$ctrl'
            });
    }
}());