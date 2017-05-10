(function () {
    'use strict';

    angular
        .module('app.progtema')
        .controller('progTemaController', progTemaController);

    progTemaController.$inject = ['ProgTemaFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast', '$filter'];



    function progTemaController(ProgTemaFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, $mdToast, $filter) {



        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.progtemas = [];
        self.progtema = {};
        self.CreateOrEditProgtema = CreateOrEditProgtema;
        self.showConfirm = showConfirm;
        self.deletePrgotema = deletePrgotema;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');


        //  getPaisListas();

        getProgtemas();
        getListas();

        function getProgtemas() {
            ProgTemaFactory.getProgTemas().then(function (response) {
                console.log("controllerss", response)
                var response = response.data;
                self.progtemas = response;
            }, handleError);
        }

        function getListas() {
            SelectsFactory.getListas(false, false, false, true, true, true).then(function (response) {
                var response = response.data;
                console.log(response);
                self.profesores = response.profesores;
                self.temas = response.temas;
                self.materias = response.materias;
            }, handleError);
        }


        function deletePrgotema(modelo, index) {
            ProgTemaFactory.deleteProgTema(modelo).then(function (response) {
                var response = response.data
                self.progtemas.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
            }, handleError);
        }


        function CreateOrEditProgtema(accion, hlnprogtemaid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = "Programar Tema";
            }
            else if (accion == "Editar") {
                titulo = "Editar Programación";
            }


            if (hlnprogtemaid == null) {
                hlnprogtemaid = 0;
            }

            ProgTemaFactory.getProgTema(hlnprogtemaid).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.progtema = response;


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
                self.deletePrgotema(modelo, index);
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


    function ModalController($uibModalInstance, $scope, $http, ProgTemaFactory, titulo, index, scope, $filter) {

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

            console.log(modelo);
            ProgTemaFactory.crearProgTema(modelo).then(function (response) {
                console.log(response);
                var response = response.data;
                self.progtema = response;
                self.progtemas.push(response);
                self.scope.showToast("Se creo con exito.");
            }, handleError);
        }

        function editarProgTema(modelo) {
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
                var response = response.data;
                self.progtemas[index] = response;
                self.scope.showToast("Se editó con exito.");
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

        function handleError(response) {

            self.handleError = response.data;
            self.loading = false;
            self.scope.showToast(response.data, 'md-toast-content');
            return self.handleError
        }
    }

}());