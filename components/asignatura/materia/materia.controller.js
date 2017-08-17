(function () {
    'use strict';

       angular
        .module('app.asignatura.materia')
        .controller('MateriaController', MateriaController);

    MateriaController.$inject = ['materiaFactory', '$state', '$scope', '$uibModal', '$mdDialog', 'toastr'];

    function MateriaController(materiaFactory, $state, $scope, $uibModal, $mdDialog, toastr) {

        var self = this;
        self.materias = [];
        self.materia = {};
        self.CreateOrEditMateria = CreateOrEditMateria;
        self.showConfirm = showConfirm;
        self.deleteMateria = deleteMateria;
        getMaterias();

        function getMaterias() {
            materiaFactory.getMaterias().then(function (response) {
                self.materias = response.data;
            }, handleError);    
        }

        function deleteMateria(modelo, index) {
            materiaFactory.deleteMateria(modelo).then(function (response) {
                var response = response.data
                self.materias.splice(index, 1);
                toastr.successhall("Se elimino exitosamente.");
            }, handleError);
        }

        function CreateOrEditMateria(accion, hlnmateriaid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = "Crear Materia";
            }
            else if (accion == "Editar") {
                titulo = "Editar Materia";
            }
            if (hlnmateriaid == null) {
                hlnmateriaid = 0;
            }
            materiaFactory.getMateria(hlnmateriaid).then(function (response) {
                var response = response.data;

                self.materia = response;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditMateria.html',
                    controller: ModalController,
                    controllerAs: '$ctrl',
                    windowClass: 'u-modalPosition',
                    size: 'md',
                    resolve: {
                        titulo: function () { return titulo },
                        index: function () { return index },
                        scope: function () { return self },
                        handleError: function () { return handleError}
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
                self.deleteMateria(modelo, index);
            }, function () {

            });
        };

    }

    function ModalController($uibModalInstance, $scope, $http, materiaFactory, toastr, titulo, index, scope, handleError) {

        var self = this;
        self.titulo = titulo;
        self.scope = scope;
        self.materia = self.scope.materia;
        self.materias = self.scope.materias;
        self.crearMateria = crearMateria;
        self.editarMateria = editarMateria;
        self.cancel = cancel;
        
        function crearMateria(modelo) {
            materiaFactory.crearMateria(modelo).then(function (response) {
                self.materia = response.data;
                self.materias.push(response.data);
                 cancel();
                toastr.successhall("Se creo con exito.");
            }, handleError);
        }

        function editarMateria(modelo) {
            materiaFactory.editarMateria(modelo).then(function (response) {
                self.materias[index] = response.data;
                 cancel();
                handleError("Se editó con exito.");       
            }, handleError);
        }   

        function cancel() {
            $uibModalInstance.close();
        }
    }
}());