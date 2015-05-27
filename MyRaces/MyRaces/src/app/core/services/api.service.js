(function (module) {

    'use strict';
    /* ngInject */
    var serviceContainer = function ($http, apiDomain) {


        var service = {};
        service.getContent = function () {
            var url = apiDomain + 'dashboard/getcontent';
            return $http.get(url);
        };

        return service;
    };

    module.factory('api', serviceContainer);

})(angular.module('core'));
