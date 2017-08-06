//Routes
(function () {
    'use strict';

    angular
        .module('app.ubicacion.pais')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.ubicacion.pais',{
                url: '/paises',            
                templateUrl: 'components/ubicacion/pais/pais.view.html',
                controller: 'PaisController',
                controllerAs: '$ctrl'
            });


    }

}());
