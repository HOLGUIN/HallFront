(function () {
    'use strict';

    angular
        .module('app.ubicacion.pais')
        .controller('PaisController', PaisController);

    PaisController.$inject = ['PaisFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast'];

    function PaisController(PaisFactory, $state, $scope, $uibModal, $mdDialog, $mdToast) {
      
 console.log(PaisFactory);

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.Paises = [];
        self.Pais = {};
        self.CreateOrEditPais = CreateOrEditPais;
        self.showConfirm = showConfirm;
        self.deletePais = deletePais;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');

      //  getPaisListas();
         
getPaises();
         function getPaises()
         {
                PaisFactory.getPaises().then(function (response) {
                console.log("controllerss", response)
                var response = response.data;
                self.Paises = response;
                self.listas = response.listas;
            }, handleError);
         }

        function getPaisListas() {

            PaisFactory.getPaisListas(true).then(function (response) {
                console.log("controllerss", response)
                var response = response.data;
                self.Paises = response.modelo;
                self.listas = response.listas;
            }, handleError);
        }


        function deletePais(modelo, index) {
            PaisFactory.deletePais(modelo).then(function (response) {
                var response = response.data
                self.Paises.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
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
                var response = response.data;
                console.log("response", response);
                self.Pais = response;


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
                self.deletePais(modelo, index);
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


    function ModalController($uibModalInstance, $scope, $http, PaisFactory, titulo, index, scope) {

        var self = this;
        self.titulo = titulo;
        self.Pais = scope.Pais;;
        self.Paises = scope.Paises;
        self.crearPais = crearPais;
        self.editarPais = editarPais;
        self.cancel = cancel;
        self.scope = scope;
        //self.materias = scope.listas[0].modelo;

        self.materia = null;
        console.log(self);

        function crearPais(modelo) {

            console.log(modelo);
            PaisFactory.crearPais(modelo).then(function (response) {
                console.log(response);
                var response = response.data;
                self.Pais = response;
                self.Paises.push(response);
                self.scope.showToast("Se creo con exito.");
            }, handleError);
        }

        function editarPais(modelo) {
            PaisFactory.editarPais(modelo).then(function (response) {
                var response = response.data;
                self.Paises[index] = response;
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