(function () {
    'use strict';

    angular.module('app').controller('HomeController', HomeController);




    HomeController.$inject = ['$state', '$window', 'ProgramFactory', '$uibModal', '$translate', 'claseFactory', '$filter', 'toastr'];

    function HomeController($state, $window, ProgramFactory, $uibModal, $translate, claseFactory, $filter, toastr) {

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
            toastr.errorhall(response);
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

        function TakeTema(tema, materia, horario) {



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
                    horario: function () { return horario },
                    handleError: function () { return handleError }
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

function ModalTekeTema($uibModalInstance, $scope, titulo, tema, materia, claseFactory, hlnusuarioid, horario, $filter, handleError) {

    var self = this;
    self.tema = tema;
    self.cancel = cancel;
    self.titulo = titulo;
    self.materia = materia;
    self.SaveClass = SaveClass;
    self.changehour = changehour;
    self.fechamin = new Date();
    console.log(tema);

    //objeto para almacenar una clase
    var clase = {
        fecha: new Date(),
        horaini: '',
        horafin: '',
        hlnusuarioid: hlnusuarioid,
        hlnprogtemaid: horario.hlnprogtemaid,
        hlnclaseid: 0,
        canthoras: 0,
        calificacion: 0,
        profesorid: 0,
        precio: 0
    };

    self.clase = clase;
    self.h = horario;

    console.log(horario);
    function cancel() {
        $uibModalInstance.close();
    }

    function changehour(clase) {
        if (clase.horaini == undefined || clase.horafin == undefined) {
            clase.horaini = new Date("1970-01-01T" + self.h.horaini);
            clase.horafin = newHour(clase.horaini, 1);
        } else if (horaigual(clase.horaini, clase.horafin)) {
            clase.horafin = newHour(clase.horaini, 1);
        } else if (clase.horafin < clase.horaini) {
            clase.horafin = newHour(clase.horaini, 1);
        }
    }

    function newHour(date, hour) {
        return new Date(date.getFullYear(), date.getMonth(),
            date.getDate(), date.getHours() + hour, date.getMinutes(), date.getSeconds());
    }

    function horaigual(hi, hf) {
        try {
            return hi.getTime() === hf.getTime();
        } catch (e) {
            return false;
        }
    }

    function SaveClass(clase) {

        // clase.horaini = $filter('date')(clase.horaini, "HH:mm:ss");
        // clase.horafin = $filter('date')(clase.horafin, "HH:mm:ss");
        if (clase.fecha == undefined) {
            clase.fecha = new Date();
        } else {


            //clase.horaini = $filter('date')(clase.horaini, "HH:mm:ss");
            //clase.horafin = $filter('date')(clase.horafin, "HH:mm:ss");
            // claseFactory.postClase(clase);
        }

    }

}