(function (window, angular, undefined) {
    'use strict';

    angular
        .module('app.tomarclase')
        .controller('tomarclaseController', tomarclaseController);

    tomarclaseController.$inject = ['$stateParams', '$state', '$websocket', 'PTemaFactory', '$window', '$scope'];

    function tomarclaseController($stateParams, $state, $websocket, PTemaFactory, $window, $scope) {


        var self = this;
        var socket = window.io('http://192.168.1.5:3002/');
        self.newMessage = undefined;
        self.messages = [];

        var datauser = JSON.parse($window.localStorage.usuario) ;
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
    }
}(window, window.angular));