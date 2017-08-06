(function () {
    'use strict';

    angular
        .module('app.ubicacion.ciudad')
        .controller('CiudadController', CiudadController);

    CiudadController.$inject = ['CiudadFactory', 'SelectsFactory', '$state', '$scope', '$uibModal', '$mdDialog', '$mdToast'];

    function CiudadController(CiudadFactory, SelectsFactory, $state, $scope, $uibModal, $mdDialog, $mdToast) {

        console.log(CiudadFactory);

        var last = {
            bottom: false,
            top: false,
            left: true,
            right: true
        };


        var self = this;
        self.Ciudades = [];
        self.Ciudad = {};
        self.CreateOrEditCiudad = CreateOrEditCiudad;
        self.showConfirm = showConfirm;
        self.deleteCiudad = deleteCiudad;
        self.last = last;
        self.toastPosition = angular.extend({}, self.last);
        self.showToast = showToast;
        self.sanitizePosition = sanitizePosition;
        self.getToastPosition = getToastPosition;
        self.toast = document.querySelectorAll('#toast');


        //  getPaisListas();

        getCiudades();
        getListas();

        function getCiudades() {
            CiudadFactory.getCiudades().then(function (response) {
                console.log("controllerss", response)
                var response = response.data;
                self.Ciudades = response;
            }, handleError);
        }

        function getListas() {
            SelectsFactory.getListas(true, true, false, false, false, false).then(function (response) {
                var response = response.data;
                self.paises = response.paises;
                self.departamentos = response.depts;
            }, handleError);
        }


        function deleteCiudad(modelo, index) {
            CiudadFactory.deleteCiudad(modelo).then(function (response) {
                var response = response.data
                self.Ciudades.splice(index, 1);
                self.showToast("Se eliminó exitosamente");
            }, handleError);
        }


        function CreateOrEditCiudad(accion, hlnciudadid, index) {

            var titulo = null;

            if (accion == "Crear") {
                titulo = "Crear Ciudad";
            }
            else if (accion == "Editar") {
                titulo = "Editar Ciudad";
            }

            if (hlnciudadid == null) {
                hlnciudadid = 0;
            }

            CiudadFactory.getCiudad(hlnciudadid).then(function (response) {
                var response = response.data;
                console.log("response", response);
                self.Ciudad = response;


                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/CreateOrEditCiudad.html',
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
                self.deleteCiudad(modelo, index);
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


    function ModalController($uibModalInstance, $scope, $http, CiudadFactory, titulo, index, scope) {

        var self = this;
        self.titulo = titulo;
        self.Ciudad = scope.Ciudad;
        self.Ciudades = scope.Ciudades;
        self.CrearCiudad = CrearCiudad;
        self.editarCiudad = editarCiudad;
        self.cancel = cancel;
        self.scope = scope;
        self.departamentos = [];
        self.Depts = Depts;

        if(self.Ciudad.hlnpaisid == 0)
        {
            scope.paises.selected = null;
        }else{
           scope.paises.selected = scope.paises.filter(function (item) {
                return item.Value == self.Ciudad.hlnpaisid;
            })[0];
        }
         
       
       console.log("ciudad", self);
        if(self.Ciudad.hlndepartamentoid == 0)
        {
            self.departamentos.selected = null;
        }else{
           
           self.departamentos = scope.departamentos.filter(function (item) {
                return item.Group.Name == self.Ciudad.hlnpaisid;
            });
              
           self.departamentos.selected = scope.departamentos.filter(function (item) {
                return item.Value == self.Ciudad.hlndepartamentoid;
            })[0];
        } 
        

        function CrearCiudad(modelo) {
               
            modelo.hlnpaisid = scope.paises.selected.Value;
            modelo.hlndepartamentoid = self.departamentos.selected.Value;

            CiudadFactory.crearCiudad(modelo).then(function (response) {
                console.log(response);
                var response = response.data;
                self.Ciudad = response;
                self.Ciudades.push(response);
                self.scope.showToast("Se creo con exito.");
            }, handleError);
        }

        function editarCiudad(modelo) {
            
            modelo.hlnpaisid = scope.paises.selected.Value;
            modelo.hlndepartamentoid = self.departamentos.selected.Value;

            CiudadFactory.editarCiudad(modelo).then(function (response) {
                var response = response.data;
                self.Ciudades[index] = response;
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

        function Depts(key) {

            console.log("key", key);
            self.departamentos = scope.departamentos.filter(function (item) {
                return item.Group.Name == key.Value;
            });
        }

    }
}());