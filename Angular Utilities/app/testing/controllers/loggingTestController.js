(function (module) {
    'use strict';

    module.controller('loggingTestController', loggingTestController);

    loggingTestController.$inject = ['$location'];

    function loggingTestController($location) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})( angular.module('testing'));
