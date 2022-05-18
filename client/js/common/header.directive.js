(function() {
  'use strict';

  angular.module('eleusis.common')
    .directive('eleusisHeader', eleusisHeader);

  /*Directive Definition*/
  function eleusisHeader() {
    var directive = {
      templateUrl: 'js/common/header.template.html',
      scope: {
        style: '=',
        content: '='
      },
      controller: eleusisHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisHeaderController() {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.details = null;

    /* Methods */
    vm.$onInit = initialize;

    /* Method Functions */
    function initialize() {
    }

  }
  /*close eleusisHeaderController*/

})();
