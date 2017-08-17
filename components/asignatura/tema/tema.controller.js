(function () {
    'use strict';

    angular.module('app.asignatura.tema', []).controller('TemaController', TemaController)

    TemaController.$inject = ['temaFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr'];

    function TemaController(temaFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, toastr) {

        var self = this;
        self.temas = [];
        self.tema = {};
        self.CreateOrEditTema = CreateOrEditTema;
        self.showConfirm = showConfirm;
        self.deleteTema = deleteTema;

        getTemas();
        getListas();

        function getTemas() {
            temaFactory.getTemas().then(function (response) {
                self.temas = response.data;
            }, handleError);
        }

        function getListas() {
            SelectsFactory.getListas(false, false, false, true, false, false).then(function (response) {
                var response = response.data;
                self.materias = response.materias;
            }, handleError);
        }

        function deleteTema(modelo, index) {
            temaFactory.deleteTema(modelo).then(function (response) {
                self.temas.splice(index, 1);
                toastr.successhall("Se eliminó exitosamente");
            }, handleError);
        }

        function CreateOrEditTema(accion, hlntemaid, index) {

            var titulo = null;
            if (accion == "Crear") {
                titulo = "Crear Tema";
            }
            else if (accion == "Editar") {
                titulo = "Editar Tema";
            }
            if (hlntemaid == null) {
                hlntemaid = 0;
            }

            temaFactory.getTema(hlntemaid).then(function (response) {

                self.tema = response.data;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditTema.html',
                    controller: ModalController,
                    controllerAs: '$ctrl',
                    windowClass: 'u-modalPosition',
                    size: 'md',
                    resolve: {
                        titulo: function () { return titulo },
                        index: function () { return index },
                        scope: function () { return self },
                        handleError: function (){ return handleError}
                    }
                });
                modalInstance.result.then(function (data) {
                }, function () {
                    //console.log('cerro modal');
                });
            }, handleError);
        }

        function handleError(response) {
            toastr.errorhall(response.data);
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
                self.deleteTema(modelo, index);
            }, function () {

            });
        };
    }


    function ModalController($uibModalInstance, $scope, $http, temaFactory, toastr, titulo, index, scope, handleError) {

        var self = this;
        self.titulo = titulo;
        self.tema = scope.tema;;
        self.temas = scope.temas;
        self.crearTema = crearTema;
        self.editarTema = editarTema;
        self.cancel = cancel;
        self.scope = scope;
        self.materias = scope.materias;
        self.materia = null;

        // si el tema tiene maateria
        if (self.tema.hlnmateriaid == 0) {
            self.materias.selected = null
        } else {
            //si el tema tiene algun valor setea el valor del select
            self.materias.selected = scope.materias.filter(function (item) {
                return item.Value == self.tema.hlnmateriaid;
            })[0];
        }

        function crearTema(modelo) {
            modelo.hlnmateriaid = self.materias.selected.Value;
            temaFactory.crearTema(modelo).then(function (response) {
                self.tema = response.data;
                self.temas.push(response.data);
                cancel();
                toastr.successhall("Se creo con exito.");
            }, handleError);
        }

        function editarTema(modelo) {
            modelo.hlnmateriaid = self.materias.selected.Value;
            temaFactory.editarTema(modelo).then(function (response) {
                self.temas[index] = response.data;
                cancel();
                toastr.successhall("Se editó con exito.");
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }

    }
}());