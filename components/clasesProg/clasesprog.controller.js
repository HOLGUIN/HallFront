(function () {
    'use strict';

    angular
        .module('app.clasesprog')
        .controller('ClasesprogController', ClasesprogController);

    ClasesprogController.$inject = ['claseFactory','ClasesprogFactory', '$state', '$scope', 'toastr', '$translate', '$window'];

    function ClasesprogController(claseFactory, ClasesprogFactory, $state, $scope, toastr, $translate, $window) {

        var self = this;
        self.clases = [];

        var usuario = JSON.parse($window.localStorage.usuario); 

        getClases();

        function getClases() {
            claseFactory.getClasesAlumnos(usuario.hlnusuarioid, true).then(function (response) {
                self.clases = response.data;
                console.log(self.clases);
            }, );
        }

    }
}());