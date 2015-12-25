(function (module) {
    'use strict';

    function loggingTestController($location) {
        var vm = this;

    };

    loggingTestController.$inject = ['$location'];

    module.controller('loggingTestController', loggingTestController);

}(angular.module('testing')));
