(function () {
    'use strict';

       angular
        .module('app.asignatura.materia')
        .controller('MateriaController', MateriaController);


    MateriaController.$inject = ['materiaFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast'];

    function MateriaController(materiaFactory, $state, $scope, $uibModal, $mdDialog, $mdToast) {

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.materias = [];
        self.materia = {};
        self.CreateOrEditMateria = CreateOrEditMateria;
        self.showConfirm = showConfirm;
        self.deleteMateria = deleteMateria;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');
        getMaterias();


        function getMaterias() {

            materiaFactory.getMaterias().then(function (response) {
                console.log("controllerss",response)
                var response = response.data;
                self.materias = response;
            }, handleError);

             
        }


        function deleteMateria(modelo, index) {
            materiaFactory.deleteMateria(modelo).then(function (response) {
                var response = response.data
                self.materias.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
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
                console.log("response", response);
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
                        materia: function () { return self.materia },
                        materias: function () { return self.materias },
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
            console.log("error",self.handleError);
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
                self.deleteMateria(modelo, index);
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



    function ModalController($uibModalInstance, $scope, $http, materiaFactory, titulo, index, materia, materias, scope) {

        var self = this;
        self.titulo = titulo;
        self.materia = materia;
        self.materias = materias;
        self.crearMateria = crearMateria;
        self.editarMateria = editarMateria;
        self.cancel = cancel;
        self.scope = scope;

        console.log(self);

        function crearMateria(modelo) {

            console.log(modelo);
            materiaFactory.crearMateria(modelo).then(function (response) {
                var response = response.data;
                self.materia = response;
                self.materias.push(response);
                self.scope.showToast("Se creo con exito.");
            }, handleError);
        }

        function editarMateria(modelo) {
            materiaFactory.editarMateria(modelo).then(function (response) {
                var response = response.data;
                self.materias[index] = response;
                self.scope.showToast("Se editó con exito.");
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


    }


}());