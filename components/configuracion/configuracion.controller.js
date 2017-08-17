(function () {
    'use strict';

    angular
        .module('app.configuracion')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['ConfigFactory', '$state', '$scope', 'toastr', '$window'];

    function ConfigController(ConfigFactory, $state, $scope, toastr, $window) {

        var self = this;
        self.configuracion = {};
        self.EditConfig = EditConfig;
        self.change = false;
        self.ChangeView = ChangeView;

        getConfig();

        function getConfig() {
            ConfigFactory.getConfig().then(function (response) {
                self.configuracion = response.data;
            }, handleError);
        }

        function ChangeView() {
            self.change = !self.change;
        }

        function handleError(response) {
            toastr.errorhall(response.data, "Error");
        }

        function EditConfig(modelo) {
            ConfigFactory.putConfig(modelo).then(function (response) {
                self.configuracion = response.data;
                toastr.successhall("Se editó con exito.");
            }, handleError);
        }
    }
}());