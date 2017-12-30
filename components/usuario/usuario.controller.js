(function () {
    'use strict';

    angular
        .module('app.usuario')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = ['UsuarioFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr', '$translate'];

    function UsuarioController(UsuarioFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, toastr, $translate) {


        var self = this;
        self.Usuarios = [];
        self.Usuario = {};
        self.CreateOrEditUsuario = CreateOrEditUsuario;
        self.ChangePassword = ChangePassword;


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

            if (response.data != null || response.data != "") {
                toastr.errorhall($translate.instant(response.data), "Error")
            } else {
                toastr.errorhall($translate.instant('LNG_ERROR'), "Error");
            }
        }

        function ChangePassword(hlnusuarioid) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/widgets/app-modals/ChangePassword.html',
                controller: ModalPassword,
                controllerAs: '$ctrl',
                windowClass: 'u-modalPosition',
                size: 'md',
                resolve: {
                    hlnusuarioid: function () { return hlnusuarioid },
                    titulo: function () { return $translate.instant('LNG_CAMBCONTRASENA') },
                    handleError: function () { return handleError }
                }
            });
            modalInstance.result.then(function (data) {
            }, function () {
                //console.log('cerro modal');
            });
        }


        function CreateOrEditUsuario(accion, hlnusuarioid, index) {

            var titulo = null;

            if (accion == "Crear") {
                var cruser = $translate.instant('LNG_CREAR') + " " + $translate.instant('LNG_USUARIO_LOG');
                titulo = cruser;
            }
            else if (accion == "Editar") {
                var edtuser = $translate.instant('LNG_EDITAR') + " " + $translate.instant('LNG_USUARIO_LOG');
                titulo = edtuser;
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
                        handleError: function () { return handleError }
                    }
                });
                modalInstance.result.then(function (data) {
                }, function () {
                    //console.log('cerro modal');
                });
            }, handleError);
        }
    }


    function ModalController($uibModalInstance, $scope, $http, $translate, toastr, UsuarioFactory, titulo, index, scope, handleError) {

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

        function validaciones(modelo) {
            var val = { valida: true, data: "" };
            if (/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(modelo.correo) == false) {
                val.valida = false;
                val.data = "LNG_CORREOINV";
            }

            return val;
        }

        //Metodo para crear usuario
        function CrearUsuario(modelo) {

            var val = validaciones(modelo)

            if (val.valida) {
                modelo.hlnpaisid = self.paises.selected.Value;
                modelo.hlndepartamentoid = self.depts.selected.Value;
                modelo.hlnciudadid = self.ciudades.selected.Value;



                UsuarioFactory.crearUsuario(modelo).then(function (response) {
                    var response = response.data;
                    if (response.valida == true) {
                        self.modelo.Usuario = response.modelo;
                        self.modelo.Usuario.toast = true;
                        self.modelo.Usuarios.push(response.modelo);
                        cancel();
                        toastr.successhall($translate.instant('LNG_CREATESUCS'));
                    } else {
                        response.data = response.msj;
                        handleError(response);
                    }
                }, handleError);

            } else {
                handleError(val);
            }

        }

        function editarUsuario(modelo) {

            var val = validaciones(modelo)

            if (val.valida) {
                //selecciona la ubicacion seleccionada
                modelo.hlnpaisid = self.paises.selected.Value;
                modelo.hlndepartamentoid = self.depts.selected.Value;
                modelo.hlnciudadid = self.ciudades.selected.Value;

                UsuarioFactory.editarUsuario(modelo).then(function (response) {
                    var response = response.data;
                    if (response.valida == true) {
                        self.Usuarios[index] = response.modelo;
                        toastr.successhall($translate.instant('LNG_EDITSUCS'));
                        cancel();
                    } else {
                        response.data = response.msj;
                        handleError(response);
                    }
                }, handleError);
            } else {
                handleError(val);
            }
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


    function ModalPassword($uibModalInstance, $scope, $http, $translate, toastr, UsuarioFactory, hlnusuarioid, titulo, handleError) {
        var self = this;
        self.editPassword = editPassword;
        self.titulo = titulo;
        self.cancel = cancel;
        self.password = null;
        self.password2 = null;

        function cancel() {
            $uibModalInstance.close();
        }


        function editPassword() {

            //validacion para campos vacios
            if (self.password == null || self.password == "" || self.password2 == null || self.password2 == "") {
                toastr.errorhall($translate.instant('LNG_MSJ_6'));
            }
            //validacion para contraseñas que no coinciden
            else if (self.password != self.password2) {
                toastr.errorhall($translate.instant('LNG_MSJ_1'));
            } else {
                UsuarioFactory.editPassword(self.password, hlnusuarioid).then(function (response) {
                    toastr.successhall($translate.instant('LNG_EDITSUCS'));
                    cancel();
                }, handleError);
            }
        }

    }

}());