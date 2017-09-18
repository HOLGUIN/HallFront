(function () {
    'use strict';

    angular
        .module('app.ubicacion.ciudad')
        .controller('CiudadController', CiudadController);

    CiudadController.$inject = ['CiudadFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr', '$translate'];

    function CiudadController(CiudadFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, toastr, $translate) {

        var self = this;
        self.Ciudades = [];
        self.Ciudad = {};
        self.CreateOrEditCiudad = CreateOrEditCiudad;
        self.showConfirm = showConfirm;
        self.deleteCiudad = deleteCiudad;

        getCiudades();
        getListas();

        function getCiudades() {
            CiudadFactory.getCiudades().then(function (response) {
                self.Ciudades = response.data;
            }, handleError);
        }

        function getListas() {
            SelectsFactory.getListas(true, true, false, false, false, false).then(function (response) {
                var response = response.data;
                self.paises = response.paises;
                self.departamentos = response.depts;
            }, handleError);
        }

        function deleteCiudad(modelo, index) {
            CiudadFactory.deleteCiudad(modelo).then(function (response) {
                self.Ciudades.splice(index, 1);
                toastr.successhall($translate.instant('LNG_BORRARSUC'));
            }, handleError);
        }

        function CreateOrEditCiudad(accion, hlnciudadid, index) {

            var titulo = null;


            if (accion == "Crear") {
                titulo = $translate.instant('LNG_CREAR') + " " + $translate.instant('LNG_CIUDAD');
            }
            else if (accion == "Editar") {
                titulo = $translate.instant('LNG_EDITAR') + " " + $translate.instant('LNG_CIUDAD');
            }

            if (hlnciudadid == null) {
                hlnciudadid = 0;
            }

            CiudadFactory.getCiudad(hlnciudadid).then(function (response) {

                self.Ciudad = response.data;

                console.log(self);
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditCiudad.html',
                    controller: ModalController,
                    controllerAs: '$ctrl',
                    windowClass: 'u-modalPosition',
                    size: 'md',
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

        function handleError(response) {
            toastr.errorhall($translate.instant(response.data));
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
                .title($translate.instant('LNG_BORRAR'))
                .targetEvent(ev)
                .ok($translate.instant('LNG_ACEPTAR'))
                .cancel($translate.instant('LGN_CANCEL'))
                .hasBackdrop(false);
            $mdDialog.show(confirm).then(function () {
                self.deleteCiudad(modelo, index);
            }, function () {

            });
        };
    }


    function ModalController($uibModalInstance, $translate, $scope, $http, CiudadFactory, toastr, titulo, index, scope, handleError) {

        var self = this;
        self.titulo = titulo;
        self.Ciudad = scope.Ciudad;
        self.Ciudades = scope.Ciudades;
        self.CrearCiudad = CrearCiudad;
        self.editarCiudad = editarCiudad;
        self.cancel = cancel;
        self.scope = scope;
        self.departamentos = [];
        self.Depts = Depts;

        //selecciona el pais si tiene seleccionado el pais
        if (self.Ciudad.hlnpaisid == 0) {
            scope.paises.selected = null;
        } else {
            scope.paises.selected = scope.paises.filter(function (item) {
                return item.Value == self.Ciudad.hlnpaisid;
            })[0];
        }


        //selecciona el departamento si tiene seleccioando un departamento 
        if (self.Ciudad.hlndepartamentoid == 0) {
            self.departamentos.selected = null;
        } else {

            self.departamentos = scope.departamentos.filter(function (item) {
                return item.Group.Name == self.Ciudad.hlnpaisid;
            });

            self.departamentos.selected = scope.departamentos.filter(function (item) {
                return item.Value == self.Ciudad.hlndepartamentoid;
            })[0];
        }


        function CrearCiudad(modelo) {

            //asigna el pais y el departammento seleccionado 
            modelo.hlnpaisid = scope.paises.selected.Value;
            modelo.hlndepartamentoid = self.departamentos.selected.Value;

            CiudadFactory.crearCiudad(modelo).then(function (response) {
                self.Ciudad = response.data;
                self.Ciudades.push(response.data);
                cancel();
                toastr.successhall($translate.instant('LNG_CREATESUCS'));
            }, handleError);
        }

        function editarCiudad(modelo) {

            //asigna el pais y el departammento seleccionado 
            modelo.hlnpaisid = scope.paises.selected.Value;
            modelo.hlndepartamentoid = self.departamentos.selected.Value;

            CiudadFactory.editarCiudad(modelo).then(function (response) {
                self.Ciudades[index] = response.data;
                cancel();
                toastr.successhall($translate.instant('LNG_EDITSUCS'));
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }

        function Depts(key) {
            self.departamentos = scope.departamentos.filter(function (item) {
                return item.Group.Name == key.Value;
            });
        }

    }
}());