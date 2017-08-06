//Routes
(function () {
    'use strict';

    angular
        .module('app.ubicacion.departamento')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.ubicacion.departamento',{
                url: '/departamentos',            
                templateUrl: 'components/ubicacion/departamento/departamento.view.html',
                controller: 'DepartamentoController',
                controllerAs: '$ctrl'
            });


    }

}());