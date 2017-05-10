(function () {
    'use strict';

    angular
        .module('app.ubicacion.departamento')
        .controller('DepartamentoController', DepartamentoController);

    DepartamentoController.$inject = ['DepartamentoFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast'];

    function DepartamentoController(DepartamentoFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, $mdToast) {

        console.log(DepartamentoFactory);

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.Depts = [];
        self.Dept = {};
        self.CreateOrEditDept = CreateOrEditDept;
        self.showConfirm = showConfirm;
        self.deleteDept = deleteDept;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');


        getDepts();
        getListas();

        function getDepts() {
            DepartamentoFactory.getDepts().then(function (response) {
                console.log("controllerss", response)
                var response = response.data;
                self.Depts = response;
                self.paises = response.paises;
            }, handleError);
        }


        function getListas() {
            SelectsFactory.getListas(true, false, false, false, false, false).then(function (response) {
                var response = response.data;
                self.paises = response.paises;
            }, handleError);
        }


        function deleteDept(modelo, index) {
            DepartamentoFactory.deleteDept(modelo).then(function (response) {
                var response = response.data
                self.Depts.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
            }, handleError);
        }


        function CreateOrEditDept(accion, hlndepartamentoid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = "Crear Departamento";
            }
            else if (accion == "Editar") {
                titulo = "Editar Departamento";
            }

            if (hlndepartamentoid == null) {
                hlndepartamentoid = 0;
            }

            DepartamentoFactory.getDept(hlndepartamentoid).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.Dept = response;


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
                self.deleteDept(modelo, index);
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


    function ModalController($uibModalInstance, $scope, $http, DepartamentoFactory, titulo, index, scope) {

        var self = this;
        self.titulo = titulo;
        self.Dept = scope.Dept;
        self.Depts = scope.Depts;
        self.crearDept = crearDept;
        self.editarDept = editarDept;
        self.cancel = cancel;
        self.scope = scope;
        console.log(self.scope);
        
        if(self.Dept.hlnpaisid ==0 )
        {
            scope.paises.selected = null;
        }else{
            scope.paises.selected =  scope.paises.filter(function (item) {
                return item.Value == self.Dept.hlnpaisid;
            })[0];
        }

        self.materia = null;
        console.log(self);

        function crearDept(modelo) {
            modelo.hlnpaisid = self.scope.paises.selected.Value
            console.log(modelo);
            DepartamentoFactory.crearDept(modelo).then(function (response) {
                console.log(response);
                var response = response.data;
                self.Dept = response;
                self.Depts.push(response);
                self.scope.showToast("Se creo con exito.");
            }, handleError);
        }

        function editarDept(modelo) {
             modelo.hlnpaisid = self.scope.paises.selected.Value
            DepartamentoFactory.editarDept(modelo).then(function (response) {
                var response = response.data;
                self.Depts[index] = response;
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