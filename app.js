(function () {
    'use strict';

    angular
        .module('app', [
            'app.libraries',            
            'app.constants',
            'app.routes',
            'app.core',
            'app.selectList',
            'app.usuario',
            'app.asignatura',
            'app.ubicacion',
            'app.datos',
            'app.configuracion' ,
            'app.progtema',
            'app.programar',
            'app.tomarclase'
        ]).run(run);

    run.$inject = ['$window', '$rootScope', '$location',  '$state', '$stateParams'];

    function run($window, $rootScope, $location, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //editableOptions.theme = 'bs3';
       //  editableThemes.bs3.inputClass = 'input-sm';
        // keep user logged in after page refresh
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            var publicPages = ['/login','/CrearUsuario'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;

            var usuario = null;
                  
                 try{
                  usuario = JSON.parse($window.localStorage.usuario) ;
                 }catch(e){}
             

            if (restrictedPage && !usuario.username) {
                $location.path('/login');
            } // redirect to login page if not logged in and trying to access a restricted page
        });
    }
})();