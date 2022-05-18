(function() {
    'use strict';

    // Main Controller Definition
    angular.module('eleusis.app')
        .controller('mainController', mainCtrl);

    function mainCtrl() {
        /* jshint validthis: true */
        var vm = this;

        // Properties

        // Methods
        vm.initialize = initialize;

        // Initialization call
        vm.initialize();

        function initialize() {
        }

    }

})();
