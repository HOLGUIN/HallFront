//Routes
(function () {
    'use strict';

    angular
        .module('app.datos')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.datos', {
                url: '/misDatos',
                templateUrl: 'components/misDatos/datos.view.html',
                controller: 'DatosController',
                controllerAs: '$ctrl'
            });
    }

}());
