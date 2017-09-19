(function () {
    'use strict';

    angular
        .module('app.configuracion')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['ConfigFactory', '$state', '$scope', 'toastr', '$translate'];

    function ConfigController(ConfigFactory, $state, $scope, toastr, $translate) {

        var self = this;
        self.configuracion = {};
        self.EditConfig = EditConfig;
        self.change = false;
        self.ChangeView = ChangeView;
         
        self.tboton =  $translate.instant('LNG_EDITAR') + " " + $translate.instant('LGN_CONFIG_MENU');
        self.sboton =  $translate.instant('LGN_GUARDAR') + " " + $translate.instant('LGN_CONFIG_MENU');

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
            toastr.errorhall($translate.instant(response.data));
        }

        function EditConfig(modelo) {
            ConfigFactory.putConfig(modelo).then(function (response) {
                self.configuracion = response.data;
                toastr.successhall($translate.instant('LNG_EDITSUCS'));
            }, handleError);
        }
    }
}());