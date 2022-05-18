(function() {
  'use strict';

  angular.module('eleusis.institutions')
    .controller('InstitutionDetailsCtrl', institutionDetailsCtrl);

  function institutionDetailsCtrl(
    $stateParams, Interface, InstitutionDetails, InstitutionInscriptionDetails, InstitutionHonorsDetails, InstitutionPeopleDetails, InstitutionNetwork
  ) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.show = {
      'focus': '',
      'details': true,
      'network': true
    };
    vm.parameters = null;
    vm.datafactory = null;
    vm.networkfactory = null;
    vm.relatedData = {
      'honors': null,
      'people': null,
      'inscriptions': null
    };
    vm.relatedOptions = {
      'honors': {
        title: 'Offices',
        idField: 'ID',
        nameField: 'Honor',
        gotoType: 'honors',
        otherFields: ['Category', 'Type']
      },
      'people': {
        title: 'Officers',
        idField: 'ID',
        nameField: 'Person',
        gotoType: 'people',
        otherFields: ['Gender', 'Family']
      },
      'inscriptions': {
        title: 'Inscriptions Sponsored',
        idField: 'ID',
        nameField: 'Inscription',
        gotoType: 'inscriptions',
        otherFields: ['Object', 'Category', 'Date']
      }
    };

    /* Methods */
    vm.$onInit = initialize;
    vm.go = go;
    vm.back = back;
    vm.setFocus = setFocus;

    /* Functions */
    function initialize () {
      vm.parameters = $stateParams;
      vm.details_table = new InstitutionDetails($stateParams.idNum);
      new InstitutionInscriptionDetails($stateParams.idNum).get(get_inscriptions_cb);
      new InstitutionHonorsDetails($stateParams.idNum).get(get_honors_cb);
      new InstitutionPeopleDetails($stateParams.idNum).get(get_people_cb);
      vm.networkfactory = new InstitutionNetwork($stateParams.idNum);

      function get_honors_cb (responseData) {
        vm.relatedData.honors = responseData;
      }

      function get_people_cb (responseData) {
        vm.relatedData.people = responseData;
      }

      function get_inscriptions_cb (responseData) {
        vm.relatedData.inscriptions = responseData;
      }
    }

    function setFocus(focusPanel) {
      /* Gets panel name and either sets or unsets as focus by (un)hiding others */
      var showKeys = null;
      var currentKey = null;
      // handle if focus is not already set to that panel and hide others
      if(vm.show.focus !== focusPanel) {
        showKeys = Object.keys(vm.show);
        for(var i = 0; i < showKeys.length; i += 1) {
          currentKey = showKeys[i];
          // set focus panel if currentKey is on focus
          if(currentKey === 'focus') {
            vm.show[currentKey] = focusPanel;
          }
          // if currentKey points to the desired panel, set it to show
          else if(currentKey === focusPanel) {
            vm.show[currentKey] = true;
          }
          // if currentKey points to a non-desired panel, set it to hide
          else {
            vm.show[currentKey] = false;
          }
        }
      }
      // if focus is already set to the panel, unset it
      else {
        showKeys = Object.keys(vm.show);
        for(i = 0; i < showKeys.length; i += 1) {
          currentKey = showKeys[i];
          // unset focus panel if currentKey is on focus
          if(currentKey === 'focus') {
            vm.show[currentKey] = '';
          }
          // otherwise, set all panels to display
          else {
            vm.show[currentKey] = true;
          }
        }
      }
    }

    function go (state, entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go(state + '.details', { idNum: entryId });
    }

    function back() {
      /* Goes back to the main list for this module */
      Interface.go('institutions.list');
    }
  }

})();
