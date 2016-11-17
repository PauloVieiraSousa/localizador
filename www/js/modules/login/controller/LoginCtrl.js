define([], function() {
    'use strict';

    /**
     * @name LoginCtrl
     * @description Controler utilizado para conectar a view ao service de 
     * integração com usuário para os dados de login e cadastro de usuário.
     **/
    angular.module("app.login")
        .controller("LoginCtrl", LoginCtrl);

    /**
     * Injeção das dependencias
     *  */
    LoginCtrl.$inject = ["LoginSvc", "$state", "$ionicPopup", "$timeout"];

    /**
     * @name LoginCtrl
     * @param {factory} LoginSvc - factory responsável pelos métodos de integração com o backend
     * @param {service} $state - service para trabalhar com os redirecionamentos da rota
     * @param {service} $ionicPopup - service para integração com o usuário
     * @param {service} $timeout - service utilizado para manipular tempos de execução
     */
    function LoginCtrl(LoginSvc, $state, $ionicPopup, $timeout) {
        /*jshint validthis: true*/
        var vm = this,
            toastr = require("toastr");

        vm.popup = popup;
        vm.doLogin = doLogin;
        vm.resetPass = resetPass;
        vm.goBack = goBack;
        vm.resetForm = resetForm;
        vm.registerNewUser = registerNewUser;

        vm.user = {};
        vm.login = {};
        vm.forgot = {};
        vm.formLogin = {};
        vm.formUser = {};

        vm.enableformforgot = false;
        vm.newuser = false;

        ///////////////////
        function goBack() {
            vm.resetForm();
            $state.go('login');
        }

        function resetForm() {
            vm.user = {};
            vm.login = {};
            vm.forgot = {};

            /*
                        vm.formLogin.$setPristine();
                        vm.formUser.$setPristine();
                        vm.forgotLogin.$setPristine();
            */
            vm.enableformforgot = false;
            vm.newuser = false;
        }

        function resetPass() {
            var email = angular.copy(vm.forgot),
                svc = LoginSvc.resetPassword(email);

            svc.then(function() {
                toastr.options.timeOut = 2000;
                toastr.success('Enviaremos um e-mail para o endereço cadastrado, aguarde!', 'Acesso');
                vm.forgotLogin.$setPristine();
                vm.resetForm();
            });
            svc.catch(function() {
                toastr.options.timeOut = 2000;
                toastr.error('Não foi possivel enviar os dados, tente novamente!', 'Acesso');
                vm.forgotLogin.$setPristine();
                vm.resetForm();
            });

        }

        function registerNewUser() {
            var user = angular.copy(vm.user),
                svc = LoginSvc.addNewUser(user);

            svc.then(function() {
                vm.user = {};
                vm.formUser.$setPristine();
                $state.go('app.map');
            });
            svc.catch(function() {
                vm.resetForm();
                vm.formUser.$setPristine();
                toastr.options.timeOut = 2000;
                toastr.error('Não foi possivel acessar, tente novamente!', 'Acesso');
            });

        }

        /**
         * @name doLogin
         * @description envia os dados de login para o serviçe validar junto ao backend
         * @return null
         */
        function doLogin() {
            var login = angular.copy(vm.login),
                svc = LoginSvc.validateLogin(login);

            svc.then(function(response) {
                vm.formLogin.$setPristine();
                vm.login = [];
                $state.go('app.map');
            });
            svc.catch(function(error) {
                vm.resetForm();
                vm.formLogin.$setPristine();
                toastr.options.timeOut = 2000;
                toastr.error('Não foi possivel acessar, tente novamente!', 'Acesso');
            });
        }

        /**
         * @name popup
         * @description utilizado para retornar mensagens em forma de popup ao usuário
         * @param {String} message - mensagem a ser enviada ao usuário
         * @return null
         */
        function popup(message) {
            var configuration = {
                    title: "Acesso",
                    template: message
                },
                alertPopup = $ionicPopup.alert(configuration);
        }
    }
});