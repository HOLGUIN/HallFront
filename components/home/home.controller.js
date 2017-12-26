(function () {
    'use strict';

    angular.module('app').controller('HomeController', HomeController);




    HomeController.$inject = ['$state', '$window', 'ProgramFactory', '$uibModal', '$translate', 'claseFactory', '$filter'];

    function HomeController($state, $window, ProgramFactory, $uibModal, $translate, claseFactory, $filter) {

        /* jshint validthis: true */
        var self = this;
        self.programas = [];
        self.desctema = desctema;
        self.TakeTema = TakeTema;
        self.oneAtATime = true;
        self.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

        var usuario = JSON.parse($window.localStorage.usuario);

        //self.title = $state.current.data.moduleTitle;
        getProgramas();

        function getProgramas() {
            ProgramFactory.getProgramas().then(function (response) {
                var response = response.data
                self.programas = response;
            }, handleError);
        }

        function handleError(response) {

            //self.handleError = response.data;
            //self.loading = false;
            // self.scope.showToast(response.data, 'md-toast-content');
            return self.handleError
        }


        function desctema(tema, desctema) {

            var titulo = $translate.instant('LNG_DESCTEMA');

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

        function TakeTema(tema, materia, hlnprogtemaid) {



            var titulo = $translate.instant('LNG_PROGTEMA');

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/widgets/app-modals/CreateClase.html',
                controller: ModalTekeTema,
                controllerAs: '$ctrl',
                windowClass: 'u-modalPosition',
                size: 'md',
                resolve: {
                    titulo: function () { return titulo },
                    tema: function () { return tema },
                    materia: function () { return materia },
                    hlnusuarioid: function () { return usuario.hlnusuarioid },
                    hlnprogtemaid: function () { return hlnprogtemaid }
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

function ModalTekeTema($uibModalInstance, $scope, titulo, tema, materia, claseFactory, hlnusuarioid, hlnprogtemaid, $filter) {

    var self = this;
    self.tema = tema;
    self.cancel = cancel;
    self.titulo = titulo;
    self.materia = materia;
    self.SaveClass = SaveClass;

    console.log(tema);

    //objeto para almacenar una clase
    var clase = {
        fecha: new Date(),
        horaini: '',
        horafin: '',
        hlnusuarioid: hlnusuarioid,
        hlnprogtemaid: hlnprogtemaid,
        hlnclaseid: 0,
        canthoras: 0,
        calificacion: 0,
        profesorid: 0,
        precio: 0
    };

    self.clase = clase;

    function cancel() {
        $uibModalInstance.close();
    }

    function SaveClass(clase) {
        clase.horaini = $filter('date')(clase.horaini, "HH:mm:ss");
        clase.horafin = $filter('date')(clase.horafin, "HH:mm:ss");
        //console.log(clase);

        claseFactory.postClase(clase);
    }

}