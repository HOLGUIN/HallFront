(function () {
    

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

        var self = this;
        self.mensaje = null;
        self.uploadFile = uploadFile;
        self.files = [];
        self.changeFile = changeFile;
        self.DownloadFile = DownloadFile;
        self.DeleteFile = DeleteFile;
        self.chat = [];
        var conn = {};

        var usuario = JSON.parse($window.localStorage.usuario);

        var socket = io('https://localhost:3002/');

        var peer = new Peer({ host: 'localhost', port: 9000, path: '/', secure: true });

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

        getChats(hlnclaseid);
        getFiles(hlnclaseid);

        function getChats(hlnclaseid) {
            chatFactory.getChat(hlnclaseid).then(function (response) {
                self.chat = response.data;
            });
        }

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
                socket.emit("new-message", conn);

                           }
        }

        socket.on("receive-message", function (msg) {
            if (msg.conn_alumno == true && msg.id_conn == hlnclaseid) {
                ConnectStudent(conn);
            }
        });


        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
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

        peer.on('connection', function (connpeer) {

            connpeer.on('data', function (data) {
                self.chat.push(data);
                $scope.$apply(function () {
                    self.chat;
                    scrollPosition();
                });
            });

            document.getElementById("text_msg")
                .addEventListener("keyup", function (event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        sendMessage(self.mensaje);
                    }
                });

            self.sendMessage = sendMessage;
            function sendMessage(message) {
                if (connpeer != null) {
                    if (message != '' && message != null) {
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



        navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
            navigator.mediaDevices.webkitGetUserMedia ||
            navigator.mediaDevices.mozGetUserMedia);

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })
            .then(stream => {


                scrollPosition();
                const video = document.getElementById("Emision");
                video.srcObject = stream;
                video.onloadedmetadata = function () {
                    video.play();
                };

                peer.on('call', function (call) {
                    call.answer(stream);
                    call.on('stream', function (streamr) {
                        const videor = document.getElementById("recepcion");
                        videor.srcObject = streamr;
                        videor.onloadedmetadata = function () {
                            videor.play();
                        };
                    });
                    call.on('close', function (streamr) {
                    });
                });
            })
            .catch(err => console.log(err));
    }
}());
(function () {
    

    angular.module('app.clasealumno').controller('ClaseController', ClaseController);

    ClaseController.$inject = ['chatFactory', '$scope', '$translate', '$window', '$stateParams'];

    function ClaseController(chatFactory, $scope, $translate, $window, $stateParams) {

        var self = this;
        self.mensaje = null;
        self.chat = [];
        self.key = null;
        var conn = {};
        var connpeer = {};
        const hlnclaseid = $stateParams.hlnclaseid;
        var usuario = JSON.parse($window.localStorage.usuario);

        self.ConnectPeer = ConnectPeer;
        self.hlnusuarioid = usuario.hlnusuarioid;

        var socket = io('https://localhost:3002/');
        var peer = new Peer({ host: 'localhost', port: 9000, path: '/', secure: true });

        function scrollPosition() {
            setTimeout(function () {
                const divcontentchat = document.getElementById("content-chat");
                divcontentchat.scrollTop = divcontentchat.scrollHeight;
            }, 300)
        }

        getChats(hlnclaseid);
        connectTeacher();

        function getChats(hlnclaseid) {
            chatFactory.getChat(hlnclaseid).then(function (response) {
                self.chat = response.data;
                scrollPosition();
            });
        }

        function connobj(is_conn, conn_alumno, id_peer) {
            conn = {
                is_conn: is_conn,
                conn_alumno: conn_alumno,
                id_conn: hlnclaseid,
                id_peer: id_peer
            }

            return conn;
        }

        function connectTeacher() {
            socket.emit("new-message", connobj(null, true, null));
        }

        socket.on("receive-message", function (msg) {
            if (msg.is_conn == true && msg.id_conn == hlnclaseid) {
                ConnectPeer(msg.id_peer);
            }
        });


        function ConnectPeer(id) {

            connpeer = peer.connect(id);
            connpeer.on('open', function () {
                document.getElementById("text_msg")
                    .addEventListener("keyup", function (event) {
                        event.preventDefault();
                        if (event.keyCode == 13) {
                            console.log("ejecuto enter");
                            sendMessage(self.mensaje);
                        }
                    });

                self.sendMessage = sendMessage;
                function sendMessage(message) {
                    if (connpeer != null) {
                        if (message != '' && message != null) {

                            var modelo_chat = {
                                hlnchatid: null,
                                hlnusuarioid: usuario.hlnusuarioid,
                                hlnclaseid: hlnclaseid,
                                mensaje: message,
                                fecha: null,
                                username: usuario.username
                            }

                            chatFactory.postChat(modelo_chat).then(function (response) {
                                conn.send(modelo_chat);
                                self.chat.push(modelo_chat);
                                self.mensaje = null;
                                scrollPosition();
                            }, );
                            event.preventDefault();
                        }
                    }
                }

                connpeer.on('data', function (data) {
                    self.chat.push(data);
                    $scope.$apply(function () {
                        self.chat;
                    });
                    scrollPosition();
                });

                navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
                    navigator.mediaDevices.webkitGetUserMedia ||
                    navigator.mediaDevices.mozGetUserMedia);


                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true
                })
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
                    .catch(err => console.log(err));
            });
        }
    }
}());