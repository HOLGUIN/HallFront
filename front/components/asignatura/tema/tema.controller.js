(function () {
    'use strict';

    angular.module('app.asignatura.tema', []).controller('TemaController', TemaController)



    TemaController.$inject = ['temaFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast'];

    function TemaController(temaFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, $mdToast) {

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.temas = [];
        self.tema = {};
        self.CreateOrEditTema = CreateOrEditTema;
        self.showConfirm = showConfirm;
        self.deleteTema = deleteTema;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');

        getTemas();
        getListas();



        function getTemas() {

            temaFactory.getTemas().then(function (response) {
                console.log("controllerss", response)
                var response = response.data;
                self.temas = response;
            }, handleError);
        }


        function getListas() {
            SelectsFactory.getListas(false, false, false, true, false, false).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.materias = response.materias;

            }, handleError);
        }

        function deleteTema(modelo, index) {
            temaFactory.deleteTema(modelo).then(function (response) {
                var response = response.data
                self.temas.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
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
                var response = response.data;
                console.log("response", response);
                self.tema = response;


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
                self.deleteTema(modelo, index);
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


    function ModalController($uibModalInstance, $scope, $http, temaFactory, titulo, index, scope) {

        var self = this;
        self.titulo = titulo;
        self.tema = scope.tema;;
        self.temas = scope.temas;
        self.crearTema = crearTema;
        self.editarTema = editarTema;
        self.cancel = cancel;
        self.scope = scope;
        self.materias = scope.materias;

        if (self.tema.hlnmateriaid == 0) {
            self.materias.selected = null
        } else {
            //si el tema tiene algun valor setea el valor del select
            self.materias.selected = scope.materias.filter(function (item) {
                return item.Value == self.tema.hlnmateriaid;
            })[0];
        }



        self.materia = null;
        console.log(self);

        function crearTema(modelo) {

            modelo.hlnmateriaid = self.materias.selected.Value;
            console.log(modelo);
            temaFactory.crearTema(modelo).then(function (response) {
                var response = response.data;
                self.tema = response;
                self.temas.push(response);
                self.scope.showToast("Se creo con exito.");
            }, handleError);
        }

        function editarTema(modelo) {


            modelo.hlnmateriaid = self.materias.selected.Value;

            temaFactory.editarTema(modelo).then(function (response) {
                var response = response.data;
                self.temas[index] = response;
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