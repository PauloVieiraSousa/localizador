define([], function() {
    'use strict';

    function NotificationStorage() {
        var service = {
            save: save,
            getNotifications: getNotifications,
            remove: remove
        };
        return service;

        function save(data) {
            var AllItens = getNotifications();
            data.item = AllItens.length + 1;
            AllItens.push(data);
            localStorage.setItem("notification", angular.toJson(data));
            return true;
        }

        function getNotifications() {
            return angular.fromJson(localStorage.getItem("notification"));
        }

        function clearNotification(item) {
            var AllItens = getNotifications(),
                newItens = [];
            angular.forEach(AllItens, function(value, key) {
                if (value.item !== item) {
                    newItens.push(value);
                }
            });
            localStorage.setItem("notification", angular.toJson(newItens));

            return true;
        }

        function remove() {
            localStorage.removeItem("notification");
        }


    }

    return NotificationStorage;
});