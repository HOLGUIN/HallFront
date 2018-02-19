(function () {
    'use strict';

    angular
        .module('app.clase.alumno')
        .controller('ClaseController', ClaseController);

    ClaseController.$inject = ['chatFactory', '$scope', '$translate', '$window', '$stateParams'];

    function ClaseController(chatFactory, $scope, $translate, $window, $stateParams) {

        //inicializa las variables
        var self = this;
        self.mensaje = null;
        self.chat = [];
        self.key = null;
        var conn = {};
        var hlnclaseid = $stateParams.hlnclaseid;
        var usuario = JSON.parse($window.localStorage.usuario);

        //Inicializa los metodos
        self.ConnectPeer = ConnectPeer;
        self.hlnusuarioid = usuario.hlnusuarioid;


        //peer connection
        var peer = new Peer({ host: 'localhost', port: 9000, path: '/' });

        function scrollPosition() {
            setTimeout(function(){
                const divcontentchat = document.getElementById("content-chat");
                divcontentchat.scrollTop = divcontentchat.scrollHeight;
            }, 300)
        }

        //metodo que se ejecuta al iniciar el controlador 
        getChats(hlnclaseid);

        //consulta el historial de chats para esta clase
        function getChats(hlnclaseid) {
            chatFactory.getChat(hlnclaseid).then(function (response) {
                self.chat = response.data;
                scrollPosition();
            });
        }


        //metodo de conexio peer
        function ConnectPeer(id) {

            conn = peer.connect(id);
            //Cuando la conexion peer se abre ejecuta lo siguiente 
            conn.on('open', function () {
                //funcion para enviar el mensaje despues del enter
                document.getElementById("text_msg")
                .addEventListener("keyup", function (event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        console.log("ejecuto enter");
                        sendMessage(self.mensaje);
                    }
                });

                //Envia un mesage 
                self.sendMessage = sendMessage;
                function sendMessage(message) {
                    if (conn != null) {
                        if (message != '' && message != null) {

                            //objeto chat
                            var modelo_chat = {
                                hlnchatid: null,
                                hlnusuarioid: usuario.hlnusuarioid,
                                hlnclaseid: hlnclaseid,
                                mensaje: message,
                                fecha: null,
                                username : usuario.username
                            }
          
                            chatFactory.postChat(modelo_chat).then(function (response) {
                                conn.send(modelo_chat);
                                self.chat.push(modelo_chat);
                                self.mensaje = null;
                                scrollPosition();
                            }, );
                        }
                    }
                }

                // Receive messages
                conn.on('data', function (data) {
                    self.chat.push(data);
                    $scope.$apply(function () {
                        self.chat;
                    });
                    scrollPosition();
                });

                //codigo para que getUserMedia sea compatible con otros navegadores
                navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
                    navigator.mediaDevices.webkitGetUserMedia ||
                    navigator.mediaDevices.mozGetUserMedia);


                //Activa los medios que va a utilizar con el navegador, en este caso es audio y video
                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true
                })
                    //inicializa el video en el navegador
                    .then(stream => {

                        const video = document.getElementById("Emision");
                        video.srcObject = stream;
                        video.onloadedmetadata = function () {
                            video.play();
                        };

                        var call = peer.call(id, stream);

                        call.on('stream', function (streamr) {
                            const videor = document.getElementById("recepcion");
                            videor.srcObject = streamr;
                            videor.onloadedmetadata = function () {
                                videor.play();
                            };
                        });

                    })
                    //Error al inicializar los medios en el navegador
                    .catch(err => console.log(err));
            });
        }



    }
}());