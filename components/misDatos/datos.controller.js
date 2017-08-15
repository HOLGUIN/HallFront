(function () {
    'use strict';

    angular
        .module('app.datos')
        .controller('DatosController', DatosController);

    DatosController.$inject = ['UsuarioFactory', 'SelectsFactory', '$state', '$scope', '$window', 'toastr'];

    function DatosController(UsuarioFactory, SelectsFactory, $state, $scope, $window, toastr) {

        var usuario = JSON.parse($window.localStorage.usuario);

        var self = this;
        self.usuario = {};
        self.change = false;
        self.ChangeView = ChangeView;
        self.EditUsuario = EditUsuario;
        self.Changepais = Changepais;
        self.Changedep = Changedep;
        self.Changeciu = Changeciu;
       
        getListas();
        getUsuario(usuario.hlnusuarioid);
        
        function getListas() {
            SelectsFactory.getListas(true, true, true, false, false, false).then(function (response) {
                var response = response.data;
                self.paises = response.paises;
                self.depts = response.depts;
                self.ciud = response.ciudades;

                self.ciudadesd = response.ciudades;
                self.departamentos = response.depts;
            }, handleError);
        }


        function getUsuario(hlnusuarioid) {
            UsuarioFactory.getUsuario(hlnusuarioid).then(function (response) {
                var response = response.data;
                self.usuario = response;
            }, handleError);
        }


        function ChangeView() {
            self.change = !self.change;

            self.pais = self.paises.filter(function (item) {
                if (item.Value == self.usuario.hlnpaisid) {
                    return item;
                }
            })[0];

            self.dept = self.depts.filter(function (item) {
                if (item.Value == self.usuario.hlndepartamentoid) {
                    return item;
                }
            })[0];

            self.ciudad = self.ciud.filter(function (item) {
                if (item.Value == self.usuario.hlnciudadid) {
                    return item;
                }
            })[0];
        }

        function handleError(response) {
            toastr.errorhall(response.data, "Error");
        }

        function EditUsuario(modelo) {
            UsuarioFactory.editarUsuario(modelo).then(function (response) {
                var response = response.data;
                if (response.valida == true) {
                    self.usuario = response.modelo;
                    toastr.successhall("Se edito exitosamente.");
                } else {
                    response.data = response.msj;
                    handleError(response)
                }
            }, handleError);
        }


        function Changepais(key) {
            self.usuario.hlnpaisid = key;
            self.usuario.hlndepartamentoid = null;
            self.usuario.hlnciudadid = null;
            self.ciudadesd = [];
            self.departamentos = self.depts.filter(function (item) {
                return item.Group.Name == key;
            });
        }

        function Changeciu(key) {
            self.usuario.hlnciudadid = key;
        }

        function Changedep(key) {
            self.usuario.hlndepartamentoid = key;
            self.usuario.hlnciudadid = null;
            console.log("key", key);
            self.ciudadesd = self.ciud.filter(function (item) {
                return item.Group.Name == key;
            });
        }

    }


}());