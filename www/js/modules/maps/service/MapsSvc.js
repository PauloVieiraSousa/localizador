define([], function() {
    /* validar */
    'use strict';

    /**
     * Modulo para fazer as requisições do maps
     */
    angular.module("app")
        .factory("MapsSvc", MapsSvc);


    MapsSvc.$inject = ['$http', '$q','CONST', 'UserSvc', 'DeviceStorage'];

    //function MapsSvc($http, $q, $cordovaDevice) {
    function MapsSvc($http, $q, CONST, UserSvc, DeviceStorage) {
        var service = {
            getCurrentLocator: getCurrentLocator,
            setCurrentLocator: setCurrentLocator
        };

        return service;

        function setCurrentLocator(data) {
            var future = $q.defer();
            data.iddevice = DeviceStorage.getDevice().iddevice;
            $http({
                    method: "POST",
                    url: CONST.URL + "/backendtcc/device-current-locator",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                })
                .then(success)
                .catch(failed);

            function success(response) {
                future.resolve(response);
            }

            function failed() {
                future.reject("Não foi possivel salvar os dados");
            }

            return future.promise;
        }

        function getCurrentLocator() {
            var future = $q.defer();
            $http.jsonp("http://www.mocky.io/v2/57df50f41000008c0f597f4a?callback=JSON_CALLBACK")
                .then(success)
                .catch(failed);

            function success(response) {
                future.resolve(response);
            }

            function failed() {
                future.reject("Não foi possivel obter os dados");
            }

            return future.promise;
        }

    }
});