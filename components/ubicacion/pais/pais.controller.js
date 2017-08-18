(function () {
    'use strict';

    angular
        .module('app.ubicacion.pais')
        .controller('PaisController', PaisController);

    PaisController.$inject = ['PaisFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr'];

    function PaisController(PaisFactory, $state, $scope, $uibModal, $mdDialog, toastr) {

        var self = this;
        self.Paises = [];
        self.Pais = {};
        self.CreateOrEditPais = CreateOrEditPais;
        self.showConfirm = showConfirm;
        self.deletePais = deletePais;

        getPaises();

        function getPaises() {
            PaisFactory.getPaises().then(function (response) {
                self.Paises = response.data;
            }, handleError);
        }

        function deletePais(modelo, index) {
            PaisFactory.deletePais(modelo).then(function (response) {
                self.Paises.splice(index, 1);
                toastr.successhall("Se eliminó exitosamente.");
            }, handleError);
        }

        function CreateOrEditPais(accion, hlnpaisid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = "Crear Pais";
            }
            else if (accion == "Editar") {
                titulo = "Editar Pais";
            }
            if (hlnpaisid == null) {
                hlnpaisid = 0;
            }

            PaisFactory.getPais(hlnpaisid).then(function (response) {

                self.Pais = response.data;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditPais.html',
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
            toastr.errorhall(response.data, "Error");
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
                self.deletePais(modelo, index);
            }, function () {

            });
        };
    }


    function ModalController($uibModalInstance, $scope, $http, PaisFactory, toastr, titulo, index, scope, handleError) {

        var self = this;
        self.titulo = titulo;
        self.Pais = scope.Pais;;
        self.Paises = scope.Paises;
        self.crearPais = crearPais;
        self.editarPais = editarPais;
        self.cancel = cancel;
        self.scope = scope;

        function crearPais(modelo) {
            PaisFactory.crearPais(modelo).then(function (response) {
                self.Pais = response.data;
                self.Paises.push(response.data);
                cancel();
                toastr.successhall("Se creo con exito.");
            }, handleError);
        }

        function editarPais(modelo) {
            PaisFactory.editarPais(modelo).then(function (response) {
                self.Paises[index] = response.data;
                cancel();
                toastr.successhall("Se editó con exito.");
            }, handleError);
        }

        function cancel() {
            $uibModalInstance.close();
        }
    }
}());