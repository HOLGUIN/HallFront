(function () {
    'use strict';

    angular
        .module('app.ubicacion.departamento')
        .controller('DepartamentoController', DepartamentoController);

    DepartamentoController.$inject = ['DepartamentoFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr', '$translate'];

    function DepartamentoController(DepartamentoFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, toastr, $translate) {


        var self = this;
        self.Depts = [];
        self.Dept = {};
        self.CreateOrEditDept = CreateOrEditDept;
        self.showConfirm = showConfirm;
        self.deleteDept = deleteDept;

        getDepts();
        getListas();

        function getDepts() {
            DepartamentoFactory.getDepts().then(function (response) {
                self.Depts = response.data;
            }, handleError);
        }

        function getListas() {
            SelectsFactory.getListas(true, false, false, false, false, false).then(function (response) {
                self.paises = response.data.paises;
            }, handleError);
        }

        function deleteDept(modelo, index) {
            DepartamentoFactory.deleteDept(modelo).then(function (response) {
                self.Depts.splice(index, 1);
                toastr.successhall($translate.instant('LNG_BORRARSUC'));
            }, handleError);
        }

        function CreateOrEditDept(accion, hlndepartamentoid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = $translate.instant('LNG_CREAR') + " " + $translate.instant('LNG_DEPART');
            }
            else if (accion == "Editar") {
                titulo = $translate.instant('LNG_EDITAR') + " " + $translate.instant('LNG_DEPART');
            }

            if (hlndepartamentoid == null) {
                hlndepartamentoid = 0;
            }

            DepartamentoFactory.getDept(hlndepartamentoid).then(function (response) {

                self.Dept = response.data;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditDept.html',
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
                self.deleteDept(modelo, index);
            }, function () {

            });
        };
    }


    function ModalController($uibModalInstance, $translate, $scope, $http, DepartamentoFactory, toastr, titulo, index, scope, handleError) {

        var self = this;
        self.titulo = titulo;
        self.scope = scope;
        self.Dept = scope.Dept;
        self.Depts = scope.Depts;
        self.crearDept = crearDept;
        self.editarDept = editarDept;
        self.cancel = cancel;

        //si el departamento tiene pais selecciona el pais correspondiente 
        if (self.Dept.hlnpaisid == 0) {
            scope.paises.selected = null;
        } else {
            scope.paises.selected = scope.paises.filter(function (item) {
                return item.Value == self.Dept.hlnpaisid;
            })[0];
        }

        function crearDept(modelo) {
            modelo.hlnpaisid = self.scope.paises.selected.Value
            DepartamentoFactory.crearDept(modelo).then(function (response) {
                self.Dept = response.data;
                self.Depts.push(response.data);
                cancel();
                toastr.successhall($translate.instant('LNG_CREATESUCS'));
            }, handleError);
        }

        function editarDept(modelo) {
            modelo.hlnpaisid = self.scope.paises.selected.Value
            DepartamentoFactory.editarDept(modelo).then(function (response) {
                self.Depts[index] = response.data;
                cancel();
                toastr.successhall($translate.instant('LNG_EDITSUCS'));
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }
    }
}());