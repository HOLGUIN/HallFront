(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginFactory', '$state', '$scope', '$window'];

    function LoginController(LoginFactory, $state, $scope, $window) {

        var self = this;
        self.login = login;
        self.CrearUsuario = CrearUsuario;
      //  self.language = 'es';
       // self.changeLanguage = changeLanguage;

        function CrearUsuario() {
            console.log("Ingreso");
            $state.go('app.usuario');
        }

        //Metodo para cambiar el idioma de la aplicación
        //function changeLanguage(language) {
          //  $window.localStorage.setItem('idioma', language)
          //  self.language = language;
        //}

        function login(user, password) {
            //self.loading = true;
            LoginFactory.login(user, password).then(function (response) {
                $state.go('app.home');
            }, handleError);
        }

        initController();

        function initController() {
            // reset login status
            LoginFactory.logout();
        }

        function handleError(response) {
            // console.log('--- login error ---');
            // console.log(response.data);
            self.handleError = response.data;
            self.loading = false;
            return self.handleError
        }
    }

})();