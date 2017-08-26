(function (window, angular, undefined) {
    'use strict';

    angular
        .module('app.tomarclase')
        .controller('tomarclaseController', tomarclaseController);

    tomarclaseController.$inject = ['$stateParams', '$state', '$websocket', 'PTemaFactory', '$window', '$scope', '$timeout'];

    function tomarclaseController($stateParams, $state, $websocket, PTemaFactory, $window, $scope, $timeout) {


        var self = this;
        var socket = window.io('http://192.168.1.6:3002/');
        self.newMessage = undefined;
        self.messages = [];

        var datauser = JSON.parse($window.localStorage.usuario);
        var usuario = datauser.username;
        console.log("usuario", usuario);

        //Metodo que envia el mensaje al socket
        self.sendMessage = function () {
            var newMessage = {
                username: usuario,
                message: self.newMessage
            };
            socket.emit("new-message", newMessage);
            self.newMessage = undefined;
        };


        //Metodo que recibe los mensajes del socket
        socket.on("receive-message", function (msg) {
            $scope.$apply(function () {
                console.log("received message");
                self.messages.push(msg);
            });
        });




        //metodos para el video

        // var canvas = document.getElementById("preview");
        //var canvas = angular.element('#preview');-
        var canvas = null;

        $timeout(function () {
              canvas = document.getElementById("preview_video");


        console.log("Canvas", canvas);

        var context = canvas.getContext("2d");


        canvas.width = 900;
        canvas.height = 700;

        context.width = canvas.width;
        context.height = canvas.height;

        var video = document.getElementById("video");

        function loadCam(stream) {
            video.src = window.URL.createObjectURL(stream);
            console.log("se cargo correctamente");
        }

        function loadFail() {
            console.log("ocurrio un error para cargar la camara");
        }

        function viewVideo(video, context) {
            context.drawImage(video, 0, 0, context.width, context.height);
            socket.emit("stream-video", canvas.toDataURL('image/webp'));
        }


        //enciende el servicio de camara del pc emisor
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msgGetUserMedia)

        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, loadCam, loadFail);
        }

        setInterval(function () {
            //console.log("esta copiando a canvas");
            viewVideo(video, context);
        }, 30);

        }, 1000);
      


    }
}(window, window.angular));