define([], function() {
    'use strict';

    angular.module('app')
        .factory('ConfigurationSvc', ConfigurationSvc);

    ConfigurationSvc.$inject = ["$http", "$q", "CONST", "UserSvc", "DeviceStorage"];

    function ConfigurationSvc($http, $q, CONST, UserSvc, DeviceStorage) {
        var service = {
            pushNotification: pushNotification
        }
        return service;
        ////////////////////////////////


        function pushNotification(data) {
            var future = $q.defer(),
                dataParam = {};

            dataParam.iddevice = DeviceStorage.getDevice().iddevice;
            dataParam.iduser = UserSvc.getUser().iduser;
            dataParam.status = data.checked;
            dataParam.registrationId = data.registrationId || 'adasdasd';
            dataParam.notification = data.checked;

            $http({
                    method: "POST",
                    url: CONST.URL + "/backendtcc/device-update-notification",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataParam
                })
                .then(success)
                .catch(failed);

            function success(response) {
                future.resolve(response.data);
            }

            function failed() {
                future.reject("não foi possivel obter os dados de configuração");
            }

            return future.promise;
        }

        /**
         * @name setConfiguration
         * @description retornar as configurações definidas anteriormente
         * @return {Promise}
         */
        function setConfiguration(model) {
            var future = $q.defer(),
                data = model;

            data.iduser = UserSvc.getUser().iduser;
            $http({
                    method: "POST",
                    url: CONST.URL + "/backendtcc/device-update",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                })
                .then(success)
                .catch(failed);

            function success(response) {
                DeviceStorage.save(parseDevice(response.data.device));
                future.resolve(response);
            }

            function failed() {
                future.reject("não foi possivel obter os dados de configuração");
            }

            return future.promise;
        }

        /**
         * @name parseDevice
         * @description efetua o parse dos dados
         * @return {Object}
         */
        function parseDevice(data) {
            var result = {};
            result = angular.copy(data);
            result.notification = data.notification == "1" ? true : false;
            return result;
        }
    }
});