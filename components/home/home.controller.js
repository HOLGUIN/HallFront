(function () {
    'use strict';

    angular.module('app').controller('HomeController', HomeController);




    HomeController.$inject = ['$state', '$window', 'ProgramFactory', '$uibModal', '$translate', 'claseFactory', '$filter', 'toastr', 'clasesAsingsFactory'];

    function HomeController($state, $window, ProgramFactory, $uibModal, $translate, claseFactory, $filter, toastr, clasesAsingsFactory) {

        /* jshint validthis: true */
        var self = this;
        self.programas = [];
        self.desctema = desctema;
        self.TakeTema = TakeTema;
        self.oneAtATime = false;
        self.getClasesAsingslt = getClasesAsingslt;
        self.line = [];
        self.fechaconsulta = new Date();
        self.fechamin = new Date();


        //Variables Slide
        self.myInterval = 4000;
        self.slides = [];
        var currIndex =0
        var newWidth = 600;

        for (var u = 1; u <= 4; u++) {
            newWidth += u;
            self.slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][self.slides.length % 4],
                id: currIndex++
              });
        }

        self.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false,
            open: true
        };

        var usuario = JSON.parse($window.localStorage.usuario);

        //self.title = $state.current.data.moduleTitle;
        getProgramas();

        function getProgramas() {
            ProgramFactory.getProgramas().then(function (response) {
                var response = response.data
                //le coloca una hora a cada uno de los objetos horario
                // angular.forEach(response, function (item) {
                //    angular.forEach(item.temas, function (temas) {
                //       angular.forEach(temas.horarios, function (h) {
                //           h.fechaconsult = new Date();
                //       });
                //   });
                // });


                self.programas = response;
            }, handleError);
        }

        function handleError(response) {
            toastr.errorhall(response);
        }

        function getHoraAsg(hlnprogtemaid, fecha) {
            clasesAsingsFactory.getClasesAsings(hlnprogtemaid, fecha).then(function (response) {
                var response = response.data;
                return response;
            }, handleError);
        }

        function getClasesAsingslt(hlnprogtemaid, fecha, h) {

            if (fecha == undefined || fecha == null || fecha == "") {
                handleError('La fecha no es valida');
            } else {
                self.fechaconsulta = fecha;
                clasesAsingsFactory.getClasesAsingslt(hlnprogtemaid, fecha).then(function (response) {
                    h.linetime = response.data;
                }, handleError);
            }
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

function ModalTekeTema($uibModalInstance, $scope, titulo, tema, materia, claseFactory, hlnusuarioid, horario, $filter, handleError, clasesAsingsFactory, $translate) {

    var self = this;
    self.tema = tema;
    self.cancel = cancel;
    self.titulo = titulo;
    self.materia = materia;
    self.SaveClass = SaveClass;
    self.changehour = changehour;
    self.getHoraAsgs = getHoraAsgs;
    self.linetime = [];
    self.horasAsg = [];
    self.mensaje = $translate.instant('LNG_MSJ_PC');

    self.fechamin = new Date();
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

    getClasesAsingslt(clase.hlnprogtemaid, clase.fecha);

    self.clase = clase;
    self.h = horario;

    function getHoraAsg(hlnprogtemaid, fecha) {
        clasesAsingsFactory.getClasesAsings(hlnprogtemaid, fecha).then(function (response) {
            self.horasAsg = response.data;
        }, handleError);
    }
    getHoraAsg(self.clase.hlnprogtemaid, self.clase.fecha);


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
        } else if (validaHourOcupadas(clase.horaini, clase.horafin)) {
            handleError('error');
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

    function getHoraAsgs(hlnprogtemaid, fecha) {
        self.horasAsg = [];
        getClasesAsingslt(hlnprogtemaid, fecha);
        self.horasAsg = getHoraAsg(hlnprogtemaid, fecha);
    }

    function validaHourOcupadas(hi, hf) {
        for (i = 0; i < self.horasAsg.length; i++) {
            var shi = new Date("1970-01-01T" + self.horasAsg[i].horaini);
            var shf = new Date("1970-01-01T" + self.horasAsg[i].horafin);

            if ((shi.getTime() >= hi.getTime() && shf.getTime() < hf.getTime()) ||
                (hi.getTime() >= shi.getTime() && hi.getTime() < shf.getTime()) ||
                (hf.getTime() > shi.getTime() && hf.getTime() < shf.getTime()) ||
                (hf.getTime() > shi.getTime() && hf.getTime() <= shf.getTime())) {
                return true;
                break;
            }
        }
    }


    function SaveClass(clase) {
        console.log(clase);
        if (clase.fecha == undefined) {
            clase.fecha = new Date();
        } else {
            clase.fecha = $filter('date')(clase.fecha, "yyyy-MM-dd");
            clase.horaini = $filter('date')(clase.horaini, "HH:mm:ss");
            clase.horafin = $filter('date')(clase.horafin, "HH:mm:ss");
            claseFactory.postClase(clase).then(function (response) {
                var response = response.data
                cancel();
            }, handleError);
        }
    }


    function getClasesAsingslt(hlnprogtemaid, fecha) {

        if (fecha == undefined || fecha == null || fecha == "") {
            handleError('La fecha no es valida');
        } else {
            self.fechaconsulta = fecha;
            clasesAsingsFactory.getClasesAsingslt(hlnprogtemaid, fecha).then(function (response) {
                self.linetime = response.data;
                console.log(self.linetime);
            }, handleError);
        }
    }

}