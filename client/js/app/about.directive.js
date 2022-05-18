(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('eleusis.app')
    .directive('eleusisAbout', eleusisAbout);

  /*Directive Definition*/
  function eleusisAbout() {
    var directive = {
      templateUrl: 'js/app/about.template.html',
      scope: {},
      controller: eleusisAboutController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisAboutController() {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.images = {
      author: 'imgs/misc/author.jpg'
    };

    /* Methods */
    vm.$onInit = initialize;

    /* Functions */
    function initialize(){

    }
  }
  /*close eleusisAboutController*/

})();
