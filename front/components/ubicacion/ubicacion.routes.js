//Routes
(function () {
    'use strict';

    angular
        .module('app.ubicacion')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.ubicacion', {
                url: '/ubicacion',
                templateUrl: 'components/ubicacion/ubicacion.view.html',
                controller: 'UbicacionController',
                controllerAs: '$ctrl'
            });
          //  .state('app.ubicacion.pais', {
            //    url: '/paises',
              //  subModule: 'app.ubicacion.pais',
               // templateUrl: 'components/ubicacion/pais/pais.view.html',
               // controller: 'PaisController',
               // controllerAs: '$ctrl'
           // });


    }

}());
