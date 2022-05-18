(function() {
  'use strict';

  angular.module('eleusis.networks')
    .controller('NetworksCtrl', networksCtrl);

  function networksCtrl(Interface, Networks) {
    /* jshint validthis: true */
    var vm = this;
    var originatorEv;

    /* Properties */
    vm.currentNetwork = null;
    vm.currentNetworkLabel = 'None';
    vm.menuItems = [];
    vm.networks = Networks;

    /* Methods */
    vm.$onInit = initialize;
    vm.openMenu = openMenu;
    vm.getNetworkTitle = getNetworkLabel;
    vm.changeNetwork = changeNetwork;

    /* Functions */
    function initialize() {
      vm.menuItems = [
          {'label': 'Benefaction: Sponsors and Honorands', 'value': 'sponsor_to_honorand'},
          {'label': 'Sponsors and those on their Inscriptions', 'value': 'sponsor_to_person'},
          {'label': 'Entities Coappearing in Inscriptions', 'value': 'coappearance'}
      ];
    }

    function openMenu($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    }

    function changeNetwork(network) {
      vm.currentNetwork = network;
      vm.currentNetworkLabel = vm.getNetworkTitle(network);
    }

    function getNetworkLabel(networkValue) {
      for(var x = 0; x < vm.menuItems.length; x += 1) {
        if(vm.menuItems[x].value === networkValue) {
          return vm.menuItems[x].label;
        }
      }
      // return a label of none if not found
      return 'None';
    }

  }

})();
