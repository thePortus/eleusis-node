(function() {
  'use strict';

  angular.module('eleusis.honors')
    .controller('HonorDetailsCtrl', honorDetailsCtrl);

  function honorDetailsCtrl(
    $stateParams, Interface, HonorDetails, HonorInscriptionsDetails, HonorInstitutionsDetails, HonorPeopleDetails, HonorNetwork
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
      'institutions': null,
      'people': null,
      'inscriptions': null
    };
    vm.relatedOptions = {
      'inscriptions': {
        title: 'Appearances on Inscriptions',
        idField: 'ID',
        nameField: 'Inscription',
        gotoType: 'inscriptions',
        otherFields: ['Object', 'Category', 'Date']
      },
      'institutions': {
        title: 'Authorizing Institution(s)',
        idField: 'ID',
        nameField: 'Institution',
        gotoType: 'institutions',
        otherFields: ['Category', 'Type']
      },
      'people': {
        title: 'People Displaying',
        idField: 'ID',
        nameField: 'Person',
        gotoType: 'people',
        otherFields: ['Gender', 'Family']
      },
    };

    /* Methods */
    vm.$onInit = initialize;
    vm.go = go;
    vm.back = back;
    vm.setFocus = setFocus;

    /* Functions */
    function initialize() {
      vm.parameters = $stateParams;
      vm.details_table = new HonorDetails($stateParams.idNum);
      new HonorInscriptionsDetails($stateParams.idNum).get(get_inscriptions_cb);
      new HonorInstitutionsDetails($stateParams.idNum).get(get_institutions_cb);
      new HonorPeopleDetails($stateParams.idNum).get(get_people_cb);
      vm.networkfactory = new HonorNetwork($stateParams.idNum);

      function get_institutions_cb(responseData) {
        vm.relatedData.institutions = responseData;
      }

      function get_people_cb(responseData) {
        vm.relatedData.people = responseData;
      }

      function get_inscriptions_cb(responseData) {
        vm.relatedData.inscriptions = responseData;
      }
    }

    function setFocus(focusPanel) {
      /* Gets panel name and either sets or unsets as focus by (un)hiding others */
      var showKeys = null;
      var currentKey = null;
      var i = 0;
      // handle if focus is not already set to that panel and hide others
      if(vm.show.focus !== focusPanel) {
        showKeys = Object.keys(vm.show);
        for(i = 0; i < showKeys.length; i += 1) {
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

    function go(state, entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go(state + '.details', {idNum: entryId});
    }

    function back() {
      /* Goes back to the main list for this module */
      Interface.go('honors.list');
    }
  }

})();
