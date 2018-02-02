(function () {
    'use strict';

    angular
        .module('app.clase.profesor')
        .controller('ClasepController', ClasepController);

    ClasepController.$inject = ['chatFactory', '$state', '$scope', '$translate', '$window', '$stateParams'];

    function ClasepController(chatFactory, $state, $scope, $translate, $window, $stateParams) {

        //inicializa las variables 
        var self = this;
        self.mensaje = null;
        self.chat = [];
        var conn = {};

        //Saca el usuario del local storage
        var usuario = JSON.parse($window.localStorage.usuario);

        //peer connection
        var peer = new Peer({ host: 'localhost', port: 9000, path: '/' });

        //El valor que llega por el link 
        var hlnclaseid = $stateParams.hlnclaseid;
        self.hlnusuarioid = usuario.hlnusuarioid;
        console.log(self.hlnusuarioid);
        //modelo
        var modelo_chat = {
            hlnchatid: null,
            hlnusuarioid: usuario.hlnusuarioid,
            hlnclaseid: hlnclaseid,
            mensaje: null,
            fecha: null
        }

        //metodo que se ejecuta al iniciar el controlador 
        getChats(hlnclaseid);

        //consulta el historial de chats para esta clase
        function getChats(hlnclaseid) {
            chatFactory.getChat(hlnclaseid).then(function (response) {
                self.chat = response.data;
            });
        }

        //metodo que se ejecuta cuando abre el  
        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            //crear el objeto que se va a emitir por el socket
            conn = {
                is_conn: true,
                id_conn: 2,
                id_peer: id
            }
        });

        //cuando establesca una conexion de peer
        peer.on('connection', function (conn) {

            //metodo para recibir mensajes  
            conn.on('data', function (data) {
                $scope.$apply(function () {
                    self.chat.push(data);
                });

            });

            //Metodo para enviar mensajes
            self.sendMessage = sendMessage;
            function sendMessage(message) {
                if (conn != null) {
                    if (message != '') {
                        modelo_chat.mensaje = message;
                        chatFactory.postChat(modelo_chat).then(function (response) {
                            conn.send(modelo_chat);
                            self.chat.push(modelo_chat);
                            self.mensaje = null;
                        }, );
                    }
                }
            }
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
                //pega el stream de video en en etiqueta html de video e inicia el stream local
                const video = document.getElementById("Emision");
                video.srcObject = stream;
                video.onloadedmetadata = function () {
                    video.play();
                };

                //Metodo para gravar el streaming
                //gotMedia(stream);
                //cuando recibe la llamade de un cliente
                peer.on('call', function (call) {
                    //Responde con mi stream local para que la otra parte me pueda ver
                    call.answer(stream);
                    //pega el stream remoto en una etiqueta video
                    call.on('stream', function (streamr) {
                        const videor = document.getElementById("recepcion");
                        videor.srcObject = streamr;
                        videor.onloadedmetadata = function () {
                            videor.play();
                        };
                    });
                    call.on('close', function (streamr) {
                       // connectingClient = false;
                    });
                });
            })
            //Error al inicializar los medios en el navegador
            .catch(err => console.log(err));
    }
}());