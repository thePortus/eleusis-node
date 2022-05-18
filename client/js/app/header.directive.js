(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('eleusis.app')
    .directive('eleusisSiteHeader', eleusisSiteHeader);

  /*Directive Definition*/
  function eleusisSiteHeader() {
    var directive = {
      templateUrl: 'js/app/header.template.html',
      scope: {},
      controller: eleusisSiteHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisSiteHeaderController(APP_TITLE, APP_VERSION, APP_CREDITS, APP_RIGHTS, Interface) {
    /* jshint validthis: true */
    var vm = this;
    var originatorEv;

    /* Properties */
    vm.app_title = APP_TITLE;
    vm.app_version = APP_VERSION;
    vm.app_credits = APP_CREDITS;
    vm.app_rights = APP_RIGHTS;
    vm.menuItems = [
        {'label': 'Home', 'value': 'home'},
        {'label': 'Networks', 'value': 'networks'},
        {'label': 'Inscriptions', 'value': 'inscriptions.list'},
        {'label': 'Institutions', 'value': 'institutions.list'},
        {'label': 'People', 'value': 'people.list'},
        {'label': 'Honors', 'value': 'honors.list'},
    ];

    /* Methods */
    vm.openMenu = openMenu;
    vm.go = go;

    /* Functions */

    function openMenu($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    }

    function go(toState) {
      Interface.go(toState, {});
    }
  }
  /*close eleusisHeaderController*/

})();
