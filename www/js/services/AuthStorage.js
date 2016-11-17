define([], function() {
    'use strict';

    function AuthStorage() {
        var service = {
            save: save,
            getToken: getToken,
            remove: remove
        };
        return service;

        function save(data) {
            localStorage.setItem("localizador-token", angular.toJson(data));
            return true;
        }

        function getToken() {
            return angular.fromJson(localStorage.getItem("localizador-token"));
        }

        function remove() {
            localStorage.removeItem("localizador-token");
        }



    }

    return AuthStorage;
});