(function () {
    'use strict';

    angular
        .module('app.configuracion')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['UsuarioFactory', 'ConfigFactory', '$state', '$scope', '$mdDialog', '$mdToast', '$window'];

    function ConfigController(UsuarioFactory, ConfigFactory, $state, $scope, $mdDialog, $mdToast, $window) {


        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.configuracion = {};
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.EditConfig = EditConfig;
        self.toast = document.querySelectorAll('#toast');
        self.change = false;
        self.ChangeView = ChangeView;
        self.zindex;

        getConfig();
        setZindex();


        function getConfig() {
            ConfigFactory.getConfig().then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.configuracion = response;
            }, handleError);
        }

        function ChangeView() {
            self.change = !self.change;
        }

        function handleError(response) {
            self.handleError = response.data
            console.log("error", self.handleError);
            showToast(response.data, 'md-toast-content');
            setTimeout(setZindex, 4000)
            return self.handleError
        }

            function EditConfig(modelo) {
            ConfigFactory.putConfig(modelo).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.configuracion = response;
                showToast("Se editó con exito.");
            }, handleError);
        }


        function showToast(msj, tipe) {
            var pinTo = self.getToastPosition();
            console.log("pinto", pinTo);
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msj)
                    .position(pinTo)
                    .hideDelay(4000)
                    .parent(document.querySelectorAll('#toaster'))
            );
        };


        function EditUsuario(modelo) {
            self.zindex = 1;
            UsuarioFactory.editarUsuario(modelo).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.usuario = response;
                showToast("Se editó con exito.");
                setTimeout(setZindex, 4000)
            }, handleError);
        }

        function setZindex() {
            self.zindex = 999999;
        }




        function sanitizePosition() {
            var current = self.toastPosition;


            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = true;
            if (current.left && last.right) current.right = true;

            self.last = angular.extend({}, current);
        }


        function getToastPosition() {
            self.sanitizePosition();

            return Object.keys(self.toastPosition)
                .filter(function (pos) { return self.toastPosition[pos]; })
                .join(' ');
        };
    }


}());