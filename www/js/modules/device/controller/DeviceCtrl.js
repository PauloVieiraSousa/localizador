define([], function(require, factory) {
    'use strict';

    angular.module("app.device")
        .controller("DeviceCtrl", DeviceCtrl);

    //DeviceCtrl.$inject = ['UserSvc'];
    DeviceCtrl.$inject = ['UserSvc']

    //function DeviceCtrl(UserSvc, $cordovaDevice)
    function DeviceCtrl(UserSvc) {
        var vm = this;
            vm.deviceData = {
                    imei: "1235468477141",
                    platform: "Android",
                    version: "1.1",
                    email: UserSvc.getUser().email
                }
            /*
                    vm.deviceData = {
                        imei : $cordovaDevice.getUUID() || "",
                        platform : $cordovaDevice.getPlatform(),
                        version : $cordovaDevice.getVersion(),
                        email : UserSvc.getUser().email
                    }
                    */
    }
});