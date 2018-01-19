//Routes
(function () {
    'use strict';

    angular
        .module('app.clasesprog')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.clasesprog', {
                url: '/Clasesprog',
                templateUrl: 'components/clasesprog/clasesprog.view.html',
                controller: 'ClasesprogController',
                controllerAs: '$ctrl'
            });
    }

}());
