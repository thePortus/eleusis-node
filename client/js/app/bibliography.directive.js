(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('eleusis.app')
    .directive('eleusisBibliography', eleusisBibliography);

  /*Directive Definition*/
  function eleusisBibliography() {
    var directive = {
      templateUrl: 'js/app/bibliography.template.html',
      scope: {},
      controller: eleusisBibliographyController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisBibliographyController(Bibliography) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.sources = [];

    /* Methods */
    vm.$onInit = initialize;

    /* Functions */
    function initialize(){
      var biblio = new Bibliography();
      biblio.get(bibliographyCB);

      function bibliographyCB(source_list) {
        vm.sources = source_list;
      }
    }
  }
  /*close eleusisBibliographyController*/

})();
