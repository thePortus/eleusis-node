(function() {
  'use strict';

  angular.module('eleusis.common')
    .factory('Api', apiFactory);

    /*Table factory function definition*/
    function apiFactory($http) {
      return apiCall;

    function apiCall(item_type, item_id, item_subtable) {
      /* item_type should be inscriptions, institutions, etc...
      item is ID num. If a list is desired, simply do not pass item_id */
      return new API(item_type, item_id, item_subtable);

      function API(item_type, item_id, item_subtable) {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.item_type = item_type;
        vm.item_id = null;
        vm.item_subtable = null;
        vm.info = null;

        /* Methods */
        vm.initialize = initialize;
        vm.get = get;
        /* Initialization Call */
        vm.initialize();

        /*Functions*/
        function initialize() {
          if(typeof item_id !== 'undefined') {
            vm.item_id = item_id;
          }
          if(typeof item_subtable !== 'undefined') {
            vm.item_subtable = item_subtable;
          }
        }

        function get(itemFactoryCallBack) {
          /* Gets info of various types (honors, people, etc.) related to inscriptions */
          // Get all inscriptions from dB
          var path = '/api/' + vm.item_type + '/';
          if(vm.item_id !== null) {
            path += vm.item_id;
          }
          if(vm.item_subtable !== null) {
            path += '/' + vm.item_subtable;
          }

          $http.get(path)
            // Retrieving data
            .then(get_info_complete)
            // Handling errors
            .catch(get_info_error);

            function get_info_complete(response) {
              itemFactoryCallBack(response.data);
            }

            function get_info_error(error) {
              if(typeof error.data !== 'undefined') {
                console.log('Error:' + error.data);
              }
            }
        }
        /* close get */
    }
    /*close API*/

  }
  /*close apiCall*/

}
/*close apiFactory*/

})();
