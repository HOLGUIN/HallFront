//Routes
(function () {
    'use strict';

    angular
        .module('app.routes', [ ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {


       /* $urlRouterProvider.otherwise('/');*/
        $urlRouterProvider.when("", "/login");
      $urlRouterProvider.when("/", "/login");
    $urlRouterProvider.otherwise('/login');

        // app routes
        $stateProvider
            .state('app', {
                abstract: true,//abstracto quiere decir que esta alli para contruir mas no para navegar
                url: '/app',
                templateUrl: 'components/core/core.view.html',
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'components/home/home.view.html',
                controller: 'HomeController',
                controllerAs: '$ctrl',
                      data: {
                    moduleTitle: 'Incio',
                    moduleName: 'home',
                    show: false
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.view.html',
                controller: 'LoginController',
                controllerAs: '$ctrl'
            })
            //.state('app.usuario',{
              //  url:'/CrearUsuario' ,
                // templateUrl:'components/usuario/usuario.view.html',
                // controller: 'UsuarioController',
                //controllerAs: '$ctrl'
           // })

            
            
            //;
    }

}());
