(function () {
    'use strict';

    angular
        .module('app.usuario')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = ['UsuarioFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast'];

    function UsuarioController(UsuarioFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, $mdToast) {

        console.log(UsuarioFactory);

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.Usuarios = [];
        self.Usuario = {};
        self.CreateOrEditUsuario = CreateOrEditUsuario;
        self.showConfirm = showConfirm;
        self.deleteUsuario = deleteUsuario;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');


        getUsuarios();
        getListas();

        function getUsuarios() {
            UsuarioFactory.getUsuarios().then(function (response) {
                var response = response.data;
                self.Usuarios = response.usuarios;
            }, handleError);
        }


        function getListas() {
            SelectsFactory.getListas(true, true, true, false, false, false).then(function (response) {
                var response = response.data;
                console.log("listas", response);
                self.paises = response.paises;
                self.departamentos = response.depts;
                self.ciudades = response.ciudades;
            }, handleError);
        }


        function deleteUsuario(modelo, index) {
            UsuarioFactory.deleteUsuario(modelo).then(function (response) {
                var response = response.data
                self.Usuarios.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
            }, handleError);
        }


        function CreateOrEditUsuario(accion, hlnusuarioid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = "Crear Usuario";
            }
            else if (accion == "Editar") {
                titulo = "Editar Usuario";
            }

            if (hlnusuarioid == null) {
                hlnusuarioid = 0;
            }

            UsuarioFactory.getUsuario(hlnusuarioid).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.Usuario = response;
                self.Usuario.toast = false;

                if (hlnusuarioid == 0) {
                    self.Usuario.activo = true;
                }

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditUsuario.html',
                    controller: ModalController,
                    controllerAs: '$ctrl',
                    windowClass: 'u-modalPosition',
                    size: 'lg',
                    resolve: {
                        titulo: function () { return titulo },
                        index: function () { return index },
                        scope: function () { return self }
                    }
                });
                modalInstance.result.then(function (data) {
                }, function () {
                    //console.log('cerro modal');
                });
            }, handleError);


        }

        function handleError(response) {
            // console.log('--- login error ---');
            // console.log(response.data);
            self.handleError = response.data;
            self.loading = false;
            console.log("error", self.handleError);
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
                self.deleteUsuario(modelo, index);
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


    function ModalController($uibModalInstance, $scope, $http, UsuarioFactory, titulo, index, scope) {

        var self = this;

        self.modelo = scope;
        self.titulo = titulo;
        self.Usuario = scope.Usuario;
        self.Usuarios = scope.Usuarios;
        self.CrearUsuario = CrearUsuario;
        self.editarUsuario = editarUsuario;
        self.cancel = cancel;
        self.scope = scope;


        //Lista para configurar la ubicacion del usuario
        self.paises = scope.paises;
        self.depts = scope.departamentos;
        self.ciudades = scope.ciudades;

        self.Ciud = Ciud;
        self.Depts = Depts;

        console.log("modelo", self.modelo);


        //self.materia = null;

        if (self.modelo.Usuario.hlnpaisid == 0) {
            self.paises.selected = null;
        } else {
            self.paises.selected = scope.paises.filter(function (item) {
                return item.Value == self.Usuario.hlnpaisid;
            })[0];
        }


        //si el usuario tiene departamento
        if (self.modelo.Usuario.hlndepartamentoid == 0) {
            self.depts.selected = null;
        } else {

            //selecciona todos los departamentos que hagan parte del pais de usuario
            self.depts = scope.departamentos.filter(function (item) {
                return item.Group.Name == self.modelo.Usuario.hlnpaisid;
            });

            //selecciona el departamento del usuario
            self.depts.selected = scope.departamentos.filter(function (item) {
                return item.Value == self.modelo.Usuario.hlndepartamentoid;
            })[0];
        }

        //si el usuario tiene ciudad
        if (self.modelo.Usuario.hlnciudadid == 0) {
            self.ciudades.selected = null;
        } else {

            //selecciona todas las ciudades que hagan parte del departamento seleccionado
            self.ciudades = scope.ciudades.filter(function (item) {
                return item.Group.Name == self.modelo.Usuario.hlndepartamentoid;
            });

            //selecciona la ciudad del usuario 
            self.ciudades.selected = scope.ciudades.filter(function (item) {
                return item.Value == self.Usuario.hlnciudadid;
            })[0];
        }



        //Metodo para crear usuario
        function CrearUsuario(modelo) {


            modelo.hlnpaisid = self.paises.selected.Value;
            modelo.hlndepartamentoid = self.depts.selected.Value;
            modelo.hlnciudadid = self.ciudades.selected.Value;

            UsuarioFactory.crearUsuario(modelo).then(function (response) {
                console.log(response);
                var response = response.data;
                console.log("se creo el usuario", response);
                if (response.valida == true) {
                    self.modelo.Usuario = response.modelo;
                    self.modelo.Usuario.toast = true;
                    self.modelo.Usuarios.push(response.modelo);
                    self.scope.showToast("Se creo con exito.");
                }else{
                    handleError(response.msj);
                }


                setToast();
            }, handleError);
        }

        function editarUsuario(modelo) {

            modelo.hlnpaisid = self.paises.selected.Value;
            modelo.hlndepartamentoid = self.depts.selected.Value;
            modelo.hlnciudadid = self.ciudades.selected.Value;

            UsuarioFactory.editarUsuario(modelo).then(function (response) {
                var response = response.data;
                
                console.log("despues de editar el usuario",response);
                self.Usuario.toast = true;
                if(response.valida == true)
                {
                 self.Usuarios[index] = response.modelo;
                 self.scope.showToast("Se editó con exito.");
                }else{
                  self.scope.showToast(response.msj);
                }         
                setToast();
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }

        function handleError(response) {

            self.handleError = response.data;
            self.loading = false;
            self.scope.showToast(response.data, 'md-toast-content');
            return self.handleError
        }

        function Depts(key) {

            console.log("key", key);
            console.log("depst", scope.depts);
            self.depts = scope.departamentos.filter(function (item) {
                return item.Group.Name == key;
            });
        }

        function Ciud(key) {
            console.log("key", key);
            self.ciudades = scope.ciudades.filter(function (item) {
                return item.Group.Name == key;
            });
        }

        function setToast() {
            setTimeout(function () {
                self.Usuario.toast = false;
            }, 4000);
        }

    }
}());