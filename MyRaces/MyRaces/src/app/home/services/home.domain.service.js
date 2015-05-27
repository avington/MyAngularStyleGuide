/**
 * Created by smoseley on 5/21/2015.
 */
(function (module) {

    'use strict';

    /* ngInject */
    var homeDomainFactory = function (api, $q /*, logger */) {
        var content;

        function getContent() {
            var defer = $q.defer();

            function handleSuccess(response) {
                defer.resolve(response.data);
                content = response.data;
            }

            function handleFail(err) {
                var message = 'query for content failed' + err.data.description;
                //TODO logger.error(message); j
                defer.reject(message);
            }

            if (content) {
                defer.resolve(content);
            } else {

                api.getContent()
                    .then(handleSuccess)
                    .catch(handleFail);
            }

            return defer.promise;
        }

        var service = {};

        service.getContent = getContent;

        return service;
    };

    module.factory('homeDomain', homeDomainFactory);

})(angular.module('home'));

