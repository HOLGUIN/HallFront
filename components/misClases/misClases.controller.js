(function () {
    'use strict';

    angular
        .module('app.misclases')
        .controller('misclasesController', misclasesController);

    misclasesController.$inject = ['claseFactory', '$window', '$scope'];

    function misclasesController(claseFactory, $window, $scope) {

        var self = this;
        self.clases = [];

        var usuario = JSON.parse($window.localStorage.usuario); 

        getClases();

        function getClases() {
            claseFactory.getClasesAlumnos(usuario.hlnusuarioid).then(function (response) {
                self.clases = response.data;
                console.log(self.clases);
            }, handleError);
        }

        function handleError()
        {
            
        }
    }
}());