(function () {
    'use strict';

    angular
        .module('app.clasesprofesor')
        .controller('ClasesProfesorController', ClasesProfesorController);

    ClasesProfesorController.$inject = ['claseFactory', 'ClasesProfesorFactory', '$state', '$scope', 'toastr', '$translate', '$window'];

    function ClasesProfesorController(claseFactory, ClasesProfesorFactory, $state, $scope, toastr, $translate, $window) {
        var self = this;
        self.clases = [];
        var usuario = JSON.parse($window.localStorage.usuario);

        getClases();

        function getClases() {
            claseFactory.getClasesProfesor(usuario.hlnusuarioid).then(function (response) {
                self.clases = response.data;
                console.log(self.clases);
            }, );
        }
    }
}());