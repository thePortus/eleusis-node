(function() {
  'use strict';

  angular.module('eleusis.app')
    .controller('HomeCtrl', homeCtrl);

  function homeCtrl() {
    /* jshint validthis: true */
    var vm = this;
    vm.selected = null;

    /* methods */
    vm.$onInit = initialize();
    vm.select = select;

    function initialize(){
      vm.selected = 'intro';
    }

    function select(tab) {
      vm.selected = tab;
    }

  }

})();
