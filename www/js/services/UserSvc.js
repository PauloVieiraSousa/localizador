define([], function() {
    'use strict';

    function UserSvc() {
        var service = {
            save: save,
            getUser: getUser,
            remove:remove
        };
        return service;

        function save(data) {
            localStorage.setItem("localizador-user", angular.toJson(data));
            return true;
        }

        function getUser() {
            return angular.fromJson(localStorage.getItem("localizador-user"));
        }

        function remove() {
            localStorage.removeItem("localizador-user");
        }
    }

    return UserSvc;
});