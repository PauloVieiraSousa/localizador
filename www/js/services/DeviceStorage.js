define([], function() {
    'use strict';

    function DeviceStorage() {
        var service = {
            save: save,
            getDevice: getDevice,
            remove: remove
        };
        return service;

        function save(data) {
            localStorage.setItem("localizador-device", angular.toJson(data));
            return true;
        }

        function getDevice() {
            return angular.fromJson(localStorage.getItem("localizador-device"));
        }

        function remove() {
            localStorage.removeItem("localizador-device");
        }


    }

    return DeviceStorage;
});