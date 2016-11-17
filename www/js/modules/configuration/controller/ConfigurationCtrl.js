define([], function() {
    'use strict';

    angular.module("app.configuration")
        .controller("ConfigurationCtrl", ConfigurationCtrl);

    ConfigurationCtrl.$inject = ['ConfigurationSvc', 'DeviceStorage', 'NotificationStorage'];

    function ConfigurationCtrl(ConfigurationSvc, DeviceStorage, NotificationStorage) {
        var vm = this,
            toastr = require('toastr');

        vm.pushNotificationChange = pushNotificationChange;

        vm.notification = { checked: angular.copy(DeviceStorage.getDevice().notification) };


        function pushNotificationChange() {
            var push = PushNotification.init({
                "android": { "senderID": "203526958559" },
                "ios": { "alert": "true", "badge": "true", "sound": "true" },
                "windows": {}
            });

            push.off('notification', function() {
                console.log('removido');
            });

            push.finish(function() {
                console.log("processing of push data is finished");
            });
            push.on('registration', function(data) {
                console.log(data.registrationId);
                // data.registrationId
            });

            push.on('notification', function(data) {
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
            });

            push.on('error', function(e) {
                // e.message
            });
            /*
            PushNotification.init({
                android: {
                    senderID: "AIzaSyAXrXWqmaVvUpccFiKvzmXWfiuKahGnAAs"
                }
            })
            push.on('registration', function(data) {

                vm.notification.registrationId = data.registrationId;

                ConfigurationSvc.pushNotification(vm.notification)
                    .then(function() {
                        toastr.options.timeOut = 1000;
                        toastr.success('Notificação ativa com sucesso!', 'Localizador');
                    })
                    .catch(function() {
                        toastr.options.timeOut = 1000;
                        toastr.error('Não foi possivel ativar a notificação!', 'Localizador');
                    });
            })
            push.on('notification', function(data) {
                console.log('notification', data);
                NotificationStorage.save(data);
            });
            */
        }
    }
});