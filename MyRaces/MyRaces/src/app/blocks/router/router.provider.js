(function (module) {

    'use strict';

    /* @ngInject */
    var routeHelperProvider = function ($urlRouterProvider, $stateProvider) {

        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        //$locationProvider.html5Mode(true);

        this.configure = ['cfg', function (cfg) {
            angular.extend(config, cfg);
        }];

        /* @ngInject */
        var routeHelper = function ($location, $rootScope, $state) {
            var hasOtherwise = false;
            var provider = {};

            provider.configureStates = function (states, otherwisePath) {
                states.forEach(function (state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            };

            return provider;
        };

        this.$get = routeHelper;
    };

    module.provider('routeHelper', routeHelperProvider);

})(angular.module('blocks'));

