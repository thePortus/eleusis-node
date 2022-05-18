(function() {
  'use strict';

  angular.module('eleusis.details')
    .directive('eleusisDetails', eleusisDetails);

  /*Directive Definition*/
  function eleusisDetails() {
    var directive = {
      templateUrl: 'js/details/details.template.html',
      scope: {
        parameters: '=',
        datafactory: '='
      },
      controller: eleusisDetailsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisDetailsController(Details) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.details = null;

    /* Methods */
    vm.$onInit = initialize;
    // vm.parseText = parseText;

    /* Method Functions */
    function initialize() {
      vm.details = new Details(vm.parameters.idNum, vm.datafactory);
      vm.fields = vm.details.fromTable.fields;
      vm.data = vm.details.data;
    }

    /* old function for parsing line numbers for margin display, doesn't work
    function parseText(rawText) {
      var numberEveryNth = 5;
      var parsedText = rawText.split('\n');
      for(var i = 0; i < parsedText.length; i += 1) {
        var newLine = {number: '', text: ''};
        if(i % (numberEveryNth - 1) === 0 && i !== 0) {
          newLine.number += (i + 1).toString();
        }
        newLine.text = parsedText[i];
        parsedText[i] = newLine;
      }
      return parsedText;
    }
    */

  }
  /*close eleusisDetailsController*/

})();
