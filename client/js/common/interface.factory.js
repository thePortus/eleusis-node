(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('eleusis.common')
    .factory('Interface', interfaceFactory);

  function interfaceFactory($state, $stateParams) {
    return new InterfaceModel();

    function InterfaceModel() {
      /* jshint validthis: true */
      var vm = this;

      /*Methods*/
      vm.go = go;
      vm.refresh = refresh;

      /*===Start of Method Functions===*/
      function go(toState, parameters) {
        // Ensure toState was sent
        if (typeof toState !== 'undefined') {
          // If parameters sent, copy to stateParams
          if(typeof parameters !== 'undefined') {
            $state.go(toState, parameters, {reload: true});
          }
          // If no parameters sent, simply go to new state
          else {
            $state.go(toState);
          }
        }
        // If no toState sent, send back to current state
        else {
          return $state.current;
        }
      }

      function currentState() {
        return $state.current;
      }

      function refresh() {
        $state.go($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      }

    }
    /*close InterfaceModel*/

  }
  /*close interfaceFactory*/

})();
