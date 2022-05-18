(function() {
  'use strict';

  angular.module('eleusis.common')
    .directive('eleusisQuickTable', eleusisQuickTable);

  /*Directive Definition*/
  function eleusisQuickTable() {
    var directive = {
      templateUrl: 'js/common/quickTable.template.html',
      scope: {
        // data is array of key/vals with of each data row
        data: '=',
        // options is key/val with keys
        // title, idField, nameField, otherFields, gotoType
        options: '='
      },
      controller: eleusisQuickTableController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisQuickTableController(Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.open = false;

    /* Methods */
    vm.$onInit = initialize;
    vm.go = go;

    /* Method Functions */
    function initialize() {
      vm.open = false;
    }

    function go(state, entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go(state + '.details', {idNum: entryId});
    }

  }
  /*close eleusisQuickTableController*/

})();
