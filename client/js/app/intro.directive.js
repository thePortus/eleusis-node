(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('eleusis.app')
    .directive('eleusisIntro', eleusisIntro);

  /*Directive Definition*/
  function eleusisIntro() {
    var directive = {
      templateUrl: 'js/app/intro.template.html',
      scope: {},
      controller: eleusisIntroController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisIntroController(Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.imgs = {
      splash: 'imgs/misc/intro-1.png',
      intro: 'imgs/misc/intro-2.png',
      help1: 'imgs/misc/websitehelp-1.jpg',
      help2: 'imgs/misc/websitehelp-2.jpg',
      help3: 'imgs/misc/websitehelp-3.jpg'
    };

    /* Methods */
    vm.$onInit = initialize;
    vm.go = go;

    /* Functions */
    function initialize(){

    }

    function go(toState, parameters){
      Interface.go(toState, parameters);
    }
  }
  /*close eleusisIntroController*/

})();
