//Routes
(function () {
    'use strict';

    angular
        .module('app.usuario')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.usuario', {
                url: '/usuarios',
                templateUrl: 'components/usuario/usuario.view.html',
                controller: 'UsuarioController',
                controllerAs: '$ctrl'
            });
    }

}());
