(function () {
    'use strict';

    angular
        .module('app.admin.auditoria')
        .controller('AuditoriaDetailsController', AuditoriaDetailsController);

    AuditoriaDetailsController.$inject = ['auditoriaFactory', '$state', '$stateParams'];

    function AuditoriaDetailsController(auditoriaFactory, $state, $stateParams) {


        var self = this,
            auditoriaId = $stateParams.id;

        

        self.auditoria = {};

        //sc/ Metodo para traer la información de los Json de auditoria
        self.getFirstPropertyKey = function (obj) {
            return Object.keys(obj);
        }

        self.getFirstPropertyValue = function (obj) {
            return Object.keys(obj);
        }

        

        //sc\



        self.states = false;

        activate();

        function activate() {

            auditoriaFactory.getAuditoria(auditoriaId).then(function (response) {
                //console.log('--- getUser response ---');
                //console.log(response);

                //sc/Metodos Necesarios para traer organizada la informacion de los Json Auditoria
                self.auditoria = response;
                self.campos_json= JSON.parse(response.campos_json);
             //   self.anterior = JSON.parse(response.anterior);

                var keys = Object.keys(self.campos_json);
                self.largo = keys.length;

                self.array = function (num) {
                    return new Array(num);
                }
                //sc\




                console.log(self.campos_json.campos);
                console.log(self.campos_json.campos);
            }, handleError);

        }


        function handleError(error) {
            console.log('--- AuditoriasUpdateController error ---');
            console.log(error);
        }


    }

} ());