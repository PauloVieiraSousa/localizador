define([], function() {
    'use strict';

    /**
     * @name LoginCtrl
     * @description Controler utilizado para conectar a view ao service de 
     * integração com usuário para os dados de login e cadastro de usuário.
     **/
    angular.module("app.maps")
        .controller("MapsCtrl", MapsCtrl);

    /**
     * Injeção das dependencias
     *  */
    MapsCtrl.$inject = ["MapsData", "MapsSvc", "$state", "$ionicPopup", "$timeout", "$ionicLoading", "$scope"];

    /**
     * @name MapsCtrl
     * @param {factory} MapsSvc - factory responsável pelos métodos de integração com o backend
     * @param {service} $state - service para trabalhar com os redirecionamentos da rota
     * @param {service} $ionicPopup - service para integração com o usuário
     * @param {service} $timeout - service utilizado para manipular tempos de execução
     * @param {service} $ionicLoading - service usado para enviar feedback a view
     * @param {service} $scope - usado para controlar os componentes da view
     */
    function MapsCtrl(MapsData, MapsSvc, $state, $ionicPopup, $timeout, $ionicLoading, $scope) {
        /*jshint validthis: true*/
        var vm = this,
            toastr = require('toastr');

        vm.initialize = initialize;
        vm.loadingShow = loadingShow;
        vm.loadingHide = loadingHide;
        vm.saveCurrentLocator = saveCurrentLocator;

        vm.MapsData = MapsData;


        ///////////////////
        vm.initialize();
        /**
         * metodo para controlar o fim do carregamento dos dados da view e recalcular a altura do disposito e aplicar ao mapa
         **/
        $scope.$on("$ionicView.afterEnter", function(event, data) {

            if ($("#map").height() == 0) {
                $("#map").css({ height: $(".scroll-content").height() })
            }
        })

        /**
         * @name loadingShow
         * @description retornar informações para o usuário
         * @param {String} menssage - mensagem a ser exibida no dispositivo
         * 
         */
        function loadingShow(message) {
            $ionicLoading.show({
                template: message
            });
        }

        /**
         * @name loadingHide
         * @description metodo para fechar o ionicLoading da view
         *  */
        function loadingHide(message) {
            $ionicLoading.hide();
        }


        /**
         * @name initialize
         * @description Metodo para inicializar os dados e componentes padrões da view
         */
        function initialize() {
            var myLatlng,
                mapOptions = {};


            vm.loadingShow("Carregando informações da localização");

            navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, onError, { timeout: 7000, maximumAge: 5000, enableHighAccuracy: true });

            function getCurrentPositionSuccess(position) {
                myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                vm.saveCurrentLocator({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

                mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Descricao do dispositivo'
                });
                $scope.map = map;

                vm.loadingHide();

                toastr.options.timeOut = 2000;
                toastr.success('Localizado com sucesso!', 'Localizador');
            }
            /**
             * retornar o status ao usuário de error
             */
            function onError(error) {
                toastr.options.timeOut = 2000;
                toastr.error('Não foi possivel localizar o dispositivo!', 'Localizador');
                vm.loadingHide();
            }
        }

        function saveCurrentLocator(locator) {
            var svc = MapsSvc.setCurrentLocator(locator);

            svc.then(function(response) {
                console.log("posição salva com sucesso");
            })
            svc.catch(function() {
                console.log("error em salvar a posição");
            });

        }


    }
});