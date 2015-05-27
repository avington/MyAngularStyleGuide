(function (module) {

    'use strict';

    /* ngInject */
    var homeControllerContainer = function (content) {
        var vm = this;

        vm.content = content;

    };

    module.controller('homeController', homeControllerContainer);

})(angular.module('home'));

