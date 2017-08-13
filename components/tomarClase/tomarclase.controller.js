(function () {
    'use strict';

    angular
        .module('app.tomarclase')
        .controller('tomarclaseController', tomarclaseController);

    tomarclaseController.$inject = ['$stateParams', '$state', '$websocket', 'PTemaFactory'];

    function tomarclaseController($stateParams, $state, $websocket, PTemaFactory) {


        var dataStream;
        var self = this;
        self.connect = connect;
        self.EnviarMensaje = EnviarMensaje;
        self.msj = null;
        console.log($websocket);

        startserver();


        function startserver() {
            PTemaFactory.startserver().then(function (response) {

            });
        }


        function connect() {


            dataStream = new $websocket('ws://localhost:1234');
            console.log("dataStream", dataStream);


            dataStream.onOpen = function () {
                console.log("Abrio la conexion", dataStream);
             //   dataStream.send("Hello World"); // I WANT TO SEND THIS MESSAGE TO THE SERVER!!!!!!!
            }


            dataStream.onMessage = function (mensaje) {
                console.log(mensaje);
            }

            dataStream.onclose = function () {
                // websocket is closed.
                alert("Connection is closed...");
            };

             dataStream.onOpen();

        }


        function EnviarMensaje(mensaje) {
           alert(mensaje);
            dataStream.send(mensaje);
             console.log("mensaje",mensaje);
        }



    }
}());