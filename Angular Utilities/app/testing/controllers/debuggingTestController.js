(function (module) {
    'use strict';

    module.controller('debuggingTestController', debuggingTestController);

    debuggingTestController.$inject = ['$location'];

    function debuggingTestController($location) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})( angular.module('testing'));
