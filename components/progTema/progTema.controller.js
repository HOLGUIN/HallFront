(function () {
    'use strict';

    angular
        .module('app.progtema')
        .controller('progTemaController', progTemaController);

    progTemaController.$inject = ['ProgTemaFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr', '$filter', '$translate'];

    function progTemaController(ProgTemaFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, toastr, $filter, $translate) {

        var self = this;
        self.progtemas = [];
        self.progtema = {};
        self.CreateOrEditProgtema = CreateOrEditProgtema;
        self.showConfirm = showConfirm;
        self.deletePrgotema = deletePrgotema;

        getProgtemas();
        getListas();

        function getProgtemas() {
            ProgTemaFactory.getProgTemas().then(function (response) {
                self.progtemas = response.data;
            }, handleError);
        }

        function getListas() {
            SelectsFactory.getListas(false, false, false, true, true, true).then(function (response) {
                var response = response.data;
                self.profesores = response.profesores;
                self.temas = response.temas;
                self.materias = response.materias;
            }, handleError);
        }

        function deletePrgotema(modelo, index) {
            ProgTemaFactory.deleteProgTema(modelo).then(function (response) {
                self.progtemas.splice(index, 1);
                toastr.successhall($translate.instant('LNG_BORRARSUC'));
            }, handleError);
        }

        function CreateOrEditProgtema(accion, hlnprogtemaid, index) {

            var titulo = null;
            if (accion == "Crear") {
                titulo = $translate.instant('LNG_CREAR') + " " + $translate.instant('LGN_CONFIG_MENU');
            }
            else if (accion == "Editar") {
                titulo = $translate.instant('LNG_EDITAR') + " " + $translate.instant('LGN_CONFIG_MENU');
            }

            if (hlnprogtemaid == null) {
                hlnprogtemaid = 0;
            }

            ProgTemaFactory.getProgTema(hlnprogtemaid).then(function (response) {

                self.progtema = response.data;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditProgTema.html',
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
                self.deletePrgotema(modelo, index);
            }, function () {

            });
        };
    }

    function ModalController($uibModalInstance, $translate, $scope, $http, ProgTemaFactory, $filter, toastr, titulo, index, scope, handleError) {

        var self = this;
        self.titulo = titulo;
        self.progtema = scope.progtema;
        self.progtemas = scope.progtemas;
        self.editarProgTema = editarProgTema;
        self.crearProgTema = crearProgTema;
        self.cancel = cancel;
        self.scope = scope;
        self.Temas = Temas;
        self.temas = [];

        if (self.progtema.hlntemaid == 0) {
            self.scope.temas.selected = null;
            self.scope.materias.selected = null;
        } else {

            self.temas.selected = scope.temas.filter(function (item) {
                return item.Value == self.progtema.hlntemaid;
            })[0];

            self.scope.materias.selected = scope.materias.filter(function (item) {
                return item.Value == self.temas.selected.Group.Name;
            })[0];

            self.temas = scope.temas.filter(function (item) {
                return item.Group.Name == self.scope.materias.selected.Value;
            });

            self.temas.selected = scope.temas.filter(function (item) {
                return item.Value == self.progtema.hlntemaid;
            })[0];

            try {
                self.progtema.hi = new Date('Thu, 01 Jan 1970 ' + self.progtema.hi);
            } catch (e) { }

            try {
                self.progtema.hf = new Date('Thu, 01 Jan 1970 ' + self.progtema.hf);
            } catch (e) { }
        }

        if (self.progtema.hlnprofesorid == 0) {
            self.scope.profesores.selected = null;
        } else {
            self.scope.profesores.selected = scope.profesores.filter(function (item) {
                return item.Value == self.progtema.hlnprofesorid;
            })[0];
        }

        function crearProgTema(modelo) {
            //toma los datos de los selects
            modelo.hlnmateriaid = self.scope.materias.selected.Value;
            modelo.hlntemaid = self.temas.selected.Value;
            modelo.hlnprofesorid = self.scope.profesores.selected.Value;

            try {
                //formatea la hora inicio
                modelo.hi = $filter('date')(modelo.hi, "HH:mm:ss");
            } catch (e) { }

            try {
                //formatea la hora inicio
                modelo.hf = $filter('date')(modelo.hf, "HH:mm:ss");
            } catch (e) { }

            ProgTemaFactory.crearProgTema(modelo).then(function (response) {
                self.progtema = response.data;
                self.progtemas.push(response.data);
                cancel();
                toastr.successhall($translate.instant('LNG_CREATESUCS'));
            }, handleError);
        }

        function editarProgTema(modelo) {
            //toma los datos de los selects
            modelo.hlnmateriaid = self.scope.materias.selected.Value;
            modelo.hlntemaid = self.temas.selected.Value;
            modelo.hlnprofesorid = self.scope.profesores.selected.Value;

            try {
                //formatea la hora inicio
                modelo.hi = $filter('date')(modelo.hi, "HH:mm:ss");
            } catch (e) { }

            try {
                //formatea la hora inicio
                modelo.hf = $filter('date')(modelo.hf, "HH:mm:ss");
            } catch (e) { }

            ProgTemaFactory.editarProgTema(modelo).then(function (response) {
                self.progtemas[index] = response.data;
                cancel();
                toastr.successhall($translate.instant('LNG_EDITSUCS'));
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }

        function Temas(key) {
            self.temas = scope.temas.filter(function (item) {
                return item.Group.Name == key.Value;
            });
        }
    }

}());