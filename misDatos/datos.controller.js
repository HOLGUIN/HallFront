(function () {
    'use strict';

    angular
        .module('app.datos')
        .controller('DatosController', DatosController);

    DatosController.$inject = ['UsuarioFactory', 'SelectsFactory', '$state', '$scope', '$mdDialog', '$mdToast', '$window'];

    function DatosController(UsuarioFactory, SelectsFactory, $state, $scope, $mdDialog, $mdToast, $window) {

        var usuario = JSON.parse($window.localStorage.usuario);
        var hlnusuarioid = usuario.hlnusuarioid;

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.usuario = {};
        self.showConfirm = showConfirm;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');
        self.change = false;
        self.ChangeView = ChangeView;
        self.EditUsuario = EditUsuario;
        self.Changepais = Changepais;
        self.Changedep = Changedep;
        self.Changeciu = Changeciu;
        self.zindex;

        getUsuario(hlnusuarioid);
        getListas();
        setZindex();


        function getListas() {
            SelectsFactory.getListas(true, true, true, false, false, false).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.paises = response.paises;
                self.depts = response.depts;
                self.ciud = response.ciudades;

                self.ciudadesd  = response.ciudades;
                self.departamentos = response.depts;
            }, handleError);
        }


        function getUsuario(hlnusuarioid) {
            UsuarioFactory.getUsuario(hlnusuarioid).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.usuario = response;
                

            }, handleError);
        }


        function ChangeView() {
            self.change = !self.change;
             
             //Changepais(self.usuario.hlnpaisid);

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
            console.log("dep",self.dept);
        }


        function handleError(response) {
            self.handleError = response.data
            console.log("error", self.handleError);
            showToast(response.data, 'md-toast-content');
            setTimeout(setZindex, 4000)
            return self.handleError
        }


        function showConfirm(ev, modelo, index) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm({
                onComplete: function afterShowAnimation() {
                    var $dialog = angular.element(document.querySelector('md-dialog'));
                    var $actionsSection = $dialog.find('md-dialog-actions');
                    var $cancelButton = $actionsSection.children()[0];
                    var $confirmButton = $actionsSection.children()[1];
                    angular.element($confirmButton).addClass('md-raised hbtn-success');
                    angular.element($cancelButton).addClass('md-raised hbtn-primary');
                    $actionsSection.children[0] = $confirmButton;
                    $actionsSection.children[1] = $cancelButton;

                }
            })
                .title('Desea eliminar este registro ?')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar')
                .hasBackdrop(false);
            $mdDialog.show(confirm).then(function () {
                self.deleteCiudad(modelo, index);
            }, function () {

            });

            console.log("confim", confirm);
        };


      
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
            self.zindex= 1;     
            UsuarioFactory.editarUsuario(modelo).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.usuario = response;
                showToast("Se editó con exito.");
                setTimeout(setZindex, 4000)
            }, handleError);
        }

        function setZindex()
        {
              self.zindex = 99998;
        }
       
               


        function Changepais(key) {
            console.log("key", key);
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