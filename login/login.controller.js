(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginFactory', '$state', '$scope'];

    function LoginController(LoginFactory, $state, $scope) {

	
	console.log('$scope*****');
	console.log($scope);
        var self = this;
        self.login = login;
		self.CrearUsuario = CrearUsuario;

		console.log('self*****');
		console.log(self);


        function CrearUsuario()
        {
            console.log("Ingreso");
            $state.go('app.usuario');
        }

        function login(user, password) {

            self.loading = true;
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