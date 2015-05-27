(function () {

    angular.module('app',
        [
            'core',
            'home'
        ]
    ).config(['$httpProvider', function ($httpProvider) {
            $httpProvider.useApplyAsync(true);
        }]);
})();
