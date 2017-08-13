(function () {
    'use strict';

    angular
        .module('app.usuario')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = ['UsuarioFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog',  'toastr'];

    function UsuarioController(UsuarioFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, toastr) {


        var self = this;
        self.Usuarios = [];
        self.Usuario = {};
        self.CreateOrEditUsuario = CreateOrEditUsuario;
        self.showConfirm = showConfirm;
        
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
                self.paises = response.paises;
                self.departamentos = response.depts;
                self.ciudades = response.ciudades;
            }, handleError);
        }

        function handleError(response) {
            toastr.error(response.data, "Error")
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
                        scope: function () { return self },
                        handleError: function () { return handleError}                    }
                });
                modalInstance.result.then(function (data) {
                }, function () {
                    //console.log('cerro modal');
                });
            }, handleError);


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


    }


    function ModalController($uibModalInstance, $scope, $http, toastr, UsuarioFactory, titulo, index, scope, handleError ) {

        var self = this;
        console.log(scope);
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


        //si tiene pais, selecciona el pais correspondiente
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
                var response = response.data;
                if (response.valida == true) {
                    self.modelo.Usuario = response.modelo;
                    self.modelo.Usuario.toast = true;
                    self.modelo.Usuarios.push(response.modelo);
                    toastr.success("Se creo con exito.");
                }else{
                    handleError(response.msj);
                }
            }, handleError);
        }

        function editarUsuario(modelo) {

            //selecciona la ubicacion seleccionada
            modelo.hlnpaisid = self.paises.selected.Value;
            modelo.hlndepartamentoid = self.depts.selected.Value;
            modelo.hlnciudadid = self.ciudades.selected.Value;

            UsuarioFactory.editarUsuario(modelo).then(function (response) {
                var response = response.data;
                if(response.valida == true)
                {
                 self.Usuarios[index] = response.modelo;
                 toastr.success("Se editó con exito.");
                }else{
                  handleError(response.msj);
                }         
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }


        function Depts(key) {
            self.depts = scope.departamentos.filter(function (item) {
                return item.Group.Name == key;
            });
        }

        function Ciud(key) {
            self.ciudades = scope.ciudades.filter(function (item) {
                return item.Group.Name == key;
            });
        }

    }
}());