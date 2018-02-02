(function () {

    'use strict';

    angular
        .module('app.chat')
        .factory('chatFactory', chatFactory);

        chatFactory.$inject = ['API_URL', '$http', '$q'];

    function chatFactory(API_URL, $http, $q) {
        return {
            postChat: postChat,
            getChat: getChat
        };

        function postChat(modelo) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Chat',
                    method: "POST",
                    data: modelo,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })
            });
        }


        function getChat(hlnclaseid) {
            return $q(function (resolve, reject) {
                $http({
                    url: API_URL + '/api/Chat',
                    method: "GET",
                    params: {
                        hlnclaseid : hlnclaseid
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (promise) {
                    resolve(promise);
                }, function (reason) {
                    reject(reason);
                })
            });
        }

    }
}());