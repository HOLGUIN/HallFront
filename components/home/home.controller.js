(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

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
        var currIndex = 0
        var newWidth = 600;

        for (var u = 1; u <= 4; u++) {
            newWidth += u;
            self.slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][self.slides.length % 4],
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
                var response = response.data;
                self.programas = response;
            }, handleError);
        }

        function handleError(response) {
            toastr.errorhall(response);
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
                templateUrl: './components/widgets/app-modals/TemaDescripcion.html',
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
                size: 'lg',
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
    self.horasLb = [];
    self.disablefield = false;
    self.h = horario;
    self.lastdate = null;
    self.preciototal = {
        cantidad: 0,
        prec_total: 0
    }
    self.mensaje = $translate.instant('LNG_MSJ_PC');
    self.mensaje2 = $translate.instant('LNG_MSJ_PCERR')
    self.fechamin = new Date();
    //objeto para almacenar una clase
    var clase = {
        fecha: new Date(0),
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


    //Este metodo identifica cuales son las horas ocupadas y disponibles
    function getHoraAsg(hlnprogtemaid, fecha) {

        clasesAsingsFactory.getClasesAsings(hlnprogtemaid, fecha).then(function (response) {

            self.lastdate = response.data[response.data.length - 1];

            self.horasAsg = response.data.filter(function (item) {
                return item.busy == true;
            });

            self.horasLb = response.data.filter(function (item) {
                return item.busy == false;
            });

            if (self.horasLb.length <= 0) {    
                self.clase.horaini = null;
                self.clase.horafin = null;
                self.disablefield = true;
            } else {             
                self.clase.horaini = new Date("1970-01-01T" + self.horasLb[0].horaini);
                self.clase.horafin = new Date("1970-01-01T" + self.horasLb[0].horafin);
                self.disablefield = false;
            }
            getClasesAsingslt(hlnprogtemaid, fecha);
            recalcularModal(self.clase.horaini, self.clase.horafin);

        }, handleError);
    }



    function cancel() {
        $uibModalInstance.close();
    }

    function changehour(clase) {

        if (clase.horaini == undefined || clase.horafin == undefined) {
            clase.horaini = new Date("1970-01-01T" + self.horasLb[0].horaini);
            clase.horafin = newHour(clase.horaini, 1);
        } else {
            //Esto es para que las horas siempre sean netas
            var hour;
            if (clase.horaini.getHours() < 10) {
                hour = "0" + clase.horaini.getHours() + ":00:00";
            } else {
                clase.horaini = new Date("1970-01-01T" + clase.horaini.getHours() + ":00:00");
            }
            if (clase.horafin.getHours() < 10) {
                hour = "0" + clase.horafin.getHours() + ":00:00";
            } else {
                clase.horafin = new Date("1970-01-01T" + clase.horafin.getHours() + ":00:00");
            }
        }

        // var aux = new Date();
        // var aux_time = new Date("1970-01-01T" + OrganizarHora(aux));
        // clase.fecha.setHours(0, 0, 0, 0);
        // aux.setHours(0, 0, 0, 0);


        if (horaigual(clase.horaini, clase.horafin)) {
            clase.horafin = newHour(clase.horaini, 1);
        } else if (clase.horafin < clase.horaini) {
            clase.horafin = newHour(clase.horaini, 1);
        } else if (validaHourOcupadas(clase.horaini, clase.horafin)) {
            clase.horaini = new Date("1970-01-01T" + self.horasLb[0].horaini);
            clase.horafin = newHour(clase.horaini, 1);
        }

        //if (horaigual(aux, clase.fecha) && aux_time.getTime() > clase.horaini.getTime() ) {
        //    handleError("error de fecha");
        // }

        //Recalcula los valores de cantidad de hora y precio total
        recalcularModal(clase.horaini, clase.horafin);
    }

    function OrganizarHora(date) {

        var hora;

        if (date.getHours() < 10) {
            hora = "0" + date.getHours();
        } else {
            hora = date.getHours()
        }
        if (date.getMinutes() < 10) {
            hora = hora + ":0" + date.getMinutes();
        } else {
            hora = hora + ":" + date.getMinutes();
        }
        if (date.getSeconds() < 10) {
            hora = hora + ":0" + date.getSeconds();
        } else {
            hora = hora + ":" + date.getSeconds();
        }
        return hora;
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

    function getHoraAsgs(hlnprogtemaid) {
        self.horasAsg = [];
        if (clase.fecha == undefined || clase.fecha == null || clase.fecha == "") {
            clase.fecha = new Date();
        }
        getClasesAsingslt(hlnprogtemaid, clase.fecha);
        getHoraAsg(hlnprogtemaid, clase.fecha);
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
            }, handleError);
        }
    }



    function recalcularModal(fechaini, fechafin) {
        var cantidad = (((fechafin - fechaini) / 1000) / 60) / 60;
        self.preciototal.cantidad = cantidad;
        self.preciototal.prec_total = cantidad * tema.preciohora;
    }

}