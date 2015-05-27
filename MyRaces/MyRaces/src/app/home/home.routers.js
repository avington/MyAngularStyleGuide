(function (module) {

    var getStates = function () {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/templates/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm',
                    title: 'Home',
                    resolve: {
                        /* @ngInject */
                        content: function (homeDomain) {
                            console.log('homeDomain', homeDomain);
                            return homeDomain.getContent();
                        }
                    }
                }
            }
        ];
    };

    /* @ngInject */
    var setupRouters = function (routeHelper) {
        routeHelper.configureStates(getStates(), '/');
    };

    module.run(setupRouters);

})(angular.module('home'));
