(function () {

    'use strict';

    angular
        .module('app.selectList')
        .factory('SelectsFactory', SelectsFactory);

    SelectsFactory.$inject = ['API_URL', '$http', '$q'];

    function SelectsFactory(API_URL, $http, $q) {
        return {
            getListas: getListas
        };



        function getListas(paises, depts, ciudades, materias, profes, temas) {
            return $q(function (resolve, reject) {

                $http({
                    url: API_URL + '/api/Listas',
                    method: "Get",
                    params: {
                        paises: paises,
                        depts: depts,
                        ciudades: ciudades,
                        materias: materias,
                        profes: profes,
                        temas : temas
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