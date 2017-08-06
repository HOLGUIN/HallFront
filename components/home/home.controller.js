(function () {
    'use strict';

    angular.module('app').controller('HomeController', HomeController);




    HomeController.$inject = ['$state', '$window', 'ProgramFactory','$uibModal'];

    function HomeController($state, $window, ProgramFactory, $uibModal) {

        /* jshint validthis: true */
        var self = this;
        self.showConfig = false;
        self.showTemplate = false;
        self.showAssistant = false;
        self.showMonitor = false;
        self.showConfig1 = false;
        self.showTemplate1 = false;
        self.showAssistant1 = false;
        self.showMonitor1 = false;
        self.programas = [];
        self.posicion = 1;
        self.desctema = desctema;
        self.oneAtATime = true;
        self.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

        var currentProfile = $window.localStorage.perfilid;

        self.title = $state.current.data.moduleTitle;
        console.log("homme", currentProfile);

        var currentAdministrador = $window.localStorage.administrador;
        var currentProfesor = $window.localStorage.profesor;
        var currentAlumno = $window.localStorage.alumno;
        activate();
        getProgramas();


        function activate() {
            if (currentAdministrador) {
                self.showAdministrador = true;
            }
            if (currentProfesor) {
                self.showProfesor = true;
            }
            if (currentAlumno) {
                self.showAlumno = true;
            }
        }


        function getProgramas() {
            ProgramFactory.getProgramas().then(function (response) {
                var response = response.data
                self.programas = response;
                console.log("programas", self.programas);
            }, handleError);
        }

        function handleError(response) {

            //self.handleError = response.data;
            //self.loading = false;
            // self.scope.showToast(response.data, 'md-toast-content');
            return self.handleError
        }


        function desctema(tema, desctema) {

            var titulo = "Descripción del Tema";

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/widgets/app-modals/TemaDescripcion.html',
                controller: ModalController,
                controllerAs: '$ctrl',
                windowClass: 'u-modalPosition',
                size: 'md',
                resolve: {
                    titulo: function () { return titulo },
                    tema: function () { return tema },
                    desctema: function () { return desctema }
                }
            });
            modalInstance.result.then(function (data) {
            }, function () {
                //console.log('cerro modal');
            });
        }


    }

}());



function ModalController($uibModalInstance, $scope, titulo, tema, desctema) {

    var self = this;
    self.tema = tema;
    self.desctema = desctema;

    function cancel() {
        $uibModalInstance.close();
    }

}