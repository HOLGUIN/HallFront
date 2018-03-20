(function () {
    'use strict';

    angular.module('app.clasesprofesor').directive('ngFiles', function ($parse) {
            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function () {
                    onChange(scope, { $files: event.target.files })
                });
            }
            return {
                link: fn_link
            }
        }).controller('ClasepController', ClasepController);

    ClasepController.$inject = ['chatFactory', 'archivoFactory', '$state', '$scope', '$translate', '$window', '$stateParams', 'toastr'];

    function ClasepController(chatFactory, archivoFactory, $state, $scope, $translate, $window, $stateParams, toastr) {

        //inicializa las variables 
        var self = this;
        self.mensaje = null;
        self.uploadFile = uploadFile;
        self.files = [];
        self.changeFile = changeFile;
        self.DownloadFile = DownloadFile;
        self.DeleteFile = DeleteFile;
        self.chat = [];
        var conn = {};

        //Saca el usuario del local storage
        var usuario = JSON.parse($window.localStorage.usuario);

        var socket = io('https://localhost:3002/');

        //peer connection
        var peer = new Peer({ host: 'localhost', port: 9000, path: '/', secure: true });

        //El valor que llega por el link 
        const hlnclaseid = $stateParams.hlnclaseid;
        self.hlnusuarioid = usuario.hlnusuarioid;

        function scrollPosition() {
            setTimeout(function () {
                const divcontentchat = document.getElementById("content-chat");
                divcontentchat.scrollTop = divcontentchat.scrollHeight;
            }, 300)
        }

        function handleError(response) {
            toastr.errorhall($translate.instant(response.data));
        }

        //metodo que se ejecuta al iniciar el controlador 
        getChats(hlnclaseid);
        getFiles(hlnclaseid);

        //consulta el historial de chats para esta clase
        function getChats(hlnclaseid) {
            chatFactory.getChat(hlnclaseid).then(function (response) {
                self.chat = response.data;
            });
        }

        //consulta el historial de archivos para esta clase
        function getFiles(hlnclaseid) {
            archivoFactory.getFiles(hlnclaseid).then(function (response) {
                self.files = response.data;
            });
        }

        function connobj(is_conn, id_peer) {
            conn = {
                is_conn: is_conn,
                id_conn: hlnclaseid,
                id_peer: id_peer
            }

            return conn;
        }

        function ConnectStudent(conn) {
            if (conn.id_peer != null) {
                //envia el peer id por el socket
                socket.emit("new-message", conn);
               
            }
        }

        socket.on("receive-message", function (msg) {
            if (msg.conn_alumno == true && msg.id_conn == hlnclaseid) {
                ConnectStudent(conn);
            }
        });


        //metodo que se ejecuta cuando abre el  
        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            //crear el objeto que se va a emitir por el socket
            ConnectStudent(connobj(true, id));
        });

        var formData = new FormData();
        function changeFile($files) {
            angular.forEach($files, function (file) {
                formData.append(file.name, file)
            });
        }

        function uploadFile() {
            var modelo = {};
            modelo.file = formData;
            modelo.hlnclaseid = hlnclaseid;
            archivoFactory.postFile(modelo).then(function (response) {
                if (response.data.valida) {
                    angular.forEach(response.data.modelo, function (item) {
                        self.files.push(item);
                    });

                    formData = new FormData();
                }
            });
        }

        function DownloadFile(hlnarchivoid) {
            archivoFactory.DownloadFile(hlnarchivoid).then(function (response) {

                var contentType = response.headers("content-type");
                var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([response], { type: 'application/text' });
                    console.log("blob", blob);
                    var url = urlCreator.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", "prueba.txt");

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            });
        }


        function DeleteFile(hlnarchivoid, index) {
            archivoFactory.deleteFile(hlnarchivoid).then(function (response) {
                console.log(response.data);
                if (response.data) {
                    self.files.splice(index, 1);
                    toastr.successhall($translate.instant('LNG_BORRARSUC'));
                }
            }, handleError);
        }

        //cuando establesca una conexion de peer
        peer.on('connection', function (connpeer) {
           
            //metodo para recibir mensajes  
            connpeer.on('data', function (data) {
                self.chat.push(data);
                $scope.$apply(function () {
                    self.chat;
                    scrollPosition();
                });
            });

            //funcion para enviar el mensaje despues del enter
            document.getElementById("text_msg")
                .addEventListener("keyup", function (event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        sendMessage(self.mensaje);
                    }
                });

            //Metodo para enviar mensajes
            self.sendMessage = sendMessage;
            function sendMessage(message) {
                if (connpeer != null) {
                    if (message != '' && message != null) {
                        //modelo
                        var modelo_chat = {
                            hlnchatid: null,
                            hlnusuarioid: usuario.hlnusuarioid,
                            hlnclaseid: hlnclaseid,
                            mensaje: message,
                            fecha: null,
                            username: usuario.username
                        }
                        chatFactory.postChat(modelo_chat).then(function (response) {
                            connpeer.send(modelo_chat);
                            self.chat.push(modelo_chat);
                            self.mensaje = null;
                            scrollPosition();
                        }, );
                        event.preventDefault();
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


                scrollPosition();
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