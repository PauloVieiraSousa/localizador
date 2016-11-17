define([], function() {
    /* validar */
    'use strict';

    /**
     * Modulo para fazer as requisições do login
     */
    angular.module("app.login")
        .factory("LoginSvc", LoginSvc);
    /**
     * @description injeção de dependencias 
     */
    // LoginSvc.$inject = ['$http', '$q', '$cordovaDevice'];
    LoginSvc.$inject = ['$http', '$q', '$cordovaDevice','CONST', 'UserSvc', 'DeviceStorage', 'AuthStorage'];
    /**
     * @name LoginSvc
     * @description factory para os servicos do login
     * @param $http - objeto para trabalhar com requisições rest
     * @param $q - objeto para trabalhar com promises
     * @return {Object}
     */
    function LoginSvc($http, $q, $cordovaDevice ,CONST, UserSvc, DeviceStorage, AuthStorage) {
        var service = {
            validateLogin: validateLogin,
            addNewUser: addNewUser,
            resetPassword: resetPassword
        };

        return service;

        ///////////////

        /**
         * @name resetPassword
         * @description Envia os dados para resetar a senha
         * @param {Object} model - email
         * @returns {Promise} retorna uma promise
         */
        function resetPassword(model) {
            var future = $q.defer();

            $http.post("")
                .then(success)
                .catch(failed);

            function success(response) {
                future.resolve(true);
            }

            function failed() {
                future.reject({
                    error: "Não foi possivel enviar os dados."
                });
            }
            return future.promise;
        }

        /**
         * @name validateLogin
         * @description Metodo utilizado para validar as credenciais do usuário
         * @param {Object} model - formulário com os dados de email e senha
         * @returns {Promise} retorna uma promise
         */
        function validateLogin(model) {
            var future = $q.defer();
            $http({
                    method: "POST",
                    url: CONST.URL + "/backendtcc/user-validate",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: model
                })
                .then(success)
                .catch(failed);

            function success(response) {
                DeviceStorage.save(parseDevice(response.data.device));
                UserSvc.save(response.data.user);
                AuthStorage.save(response.data.token);
                future.resolve(true);
            }

            function failed() {
                future.reject({
                    error: "Não foi possivel acessar"
                });
            }
            return future.promise;
        }

        /**
         * @name addNewUser
         * @description Metodo utilizado para cadastrar novo usuário 
         * @param {Object} model - objeto com os dados de email, senha, nome, dispositivo, imei, numero de telefone
         * @returns {Promise} retorna uma promise
         */
        function addNewUser(model) {
            debugger;
            var future = $q.defer();
            model.imei = $cordovaDevice.getUUID() || "";
            model.platform = $cordovaDevice.getPlatform() || "";
            model.version = $cordovaDevice.getVersion() || "";
            model.situation = true;


            $http({
                    method: "POST",
                    url: CONST.URL + "/backendtcc/user-add",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: parse(model)
                })
                .then(success)
                .catch(failed);

            function success(response) {
                DeviceStorage.save(parseDevice(response.data.device));
                UserSvc.save(parseUser(response.data.user));
                AuthStorage.save(response.data.token);
                future.resolve(true);
            }

            function failed() {
                future.reject({
                    error: "Não foi efetuar o cadastro, tente novamente!"
                });
            }
            return future.promise;
        }

        function parseUser(data) {
            var result = {};
            result = angular.copy(data);
            result.iduser = result.iduser;
            return result;
        }

        function parseDevice(data) {
            var result = {};
            result = angular.copy(data);
            result.iddevice = angular.isDefined(result.id) ? result.id : result.iddevice;
            result.locate = data.locate == "1" ? true : false;
            result.backup = data.backup == "1" ? true : false;
            result.notification = data.notification == "1" ? true : false;
            result.blocked = data.blocked == "1" ? true : false;
            return result;
        }

        function parse(model) {
            return {
                "iduser": angular.isDefined(model.iduser) ? model.iduser : null,
                "name": model.name,
                "email": model.email,
                "pass": model.pass,
                "description": angular.isDefined(model.description) ? model.description : "",
                "iddevice": angular.isDefined(model.iddevice) ? model.iddevice : null,
                "imei": angular.isDefined(model.imei) ? model.imei : null,
                "phonenumber": angular.isDefined(model.phonenumber) ? model.phonenumber : null,
                "platform": angular.isDefined(model.imei) ? model.platform : null,
                "version": angular.isDefined(model.version) ? model.version : null,
                "situation": true
            };

        }

    }


});