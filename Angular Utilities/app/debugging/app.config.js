﻿(function (module) {
    'use strict';

    module.config(function ($provide) {
        $provide.decorator('$interpolate', function ($delegate) {

            var interpolationFnWrap = function (interpolationFn, interpolationArgs) {
                return function () {
                    var result = interpolationFn.apply(this, arguments),
                        log = result ? console.log : console.warn;
                    log.call(console, 'interpolation of  ' + interpolationArgs[0].trim(),
                                      ':', result.trim());
                    return result;
                };
            };

            var interpolateWrap = function () {
                var interpolationFn = $delegate.apply(this, arguments);
                if (interpolationFn) {
                    return interpolationFnWrap(interpolationFn, arguments);
                }
            };
            
            angular.extend(interpolateWrap, $delegate);
            return interpolateWrap;

        });
    });

}(angular.module('utilities.debugging')));
