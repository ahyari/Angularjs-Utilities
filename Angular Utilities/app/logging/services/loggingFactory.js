(function (module) {
    'use strict';

    module.factory('loggingFactory', loggingFactory);

    loggingFactory.$inject = ['$http'];

    function loggingFactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function addError() { };
    }
})(angular.module('utilities.logging'));