define([], function() {
            /* validar */
            'use strict';

            /**
             * Modulo para fazer as requisições do maps
             */
            angular.module("app")
                .factory("NotificationSvc", NotificationSvc);


            NotificationSvc.$inject = ['$http', '$q', 'UserSvc'];

            //function NotificationSvc($http, $q, $cordovaDevice) {
            function NotificationSvc($http, $q, UserSvc) {
                var service = {
                    getNotification: getNotification
                };

                return service;

                function getNotification() {
                    var future = $q.defer();
                    $http.jsonp("http://www.mocky.io/v2/580fe843120000bf1e9e300c?callback=JSON_CALLBACK")
                        .then(success)
                        .catch(failed);

                    function success(response) {
                        future.resolve(parseDateSend(response.data))
                        }

                        function failed() {
                            future.reject("Não foi possivel salvar os dados");
                        }

                        return future.promise;
                    }

                    function parseDateSend(date) {
                        var newDate = [];
                        angular.forEach(date, function(value, key) {
                            newDate.push({
                                idNotification: value.idNotification,
                                datasend: new Date(value.datasend),
                                description: value.description,
                                icon: value.icon
                            });
                            value.datasend = new Date(value.datasend)
                        });
                        return newDate;
                    }

                }
            });