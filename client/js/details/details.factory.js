/* js/details/details.factory.js

This factory is initiated by a specific entry within a datatable, which sends it a datafactory
loaded with data related to a single entry within that table. This factory interprets the data factory
into information loaded into the details directive common to all tables.

*/
(function() {
  'use strict';

  angular.module('eleusis.details')
    .factory('Details', detailsFactory);

  function detailsFactory() {
    return detailsCall;

    function detailsCall(idNum, datafactory) {
      return new Details(idNum, datafactory);

      function Details(idNum, datafactory) {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum;
        vm.fromTable = datafactory;
        vm.titleField = datafactory.tableName;
        vm.data = {};

        /* Methods */
        vm.initialize = initialize;

        /* Initialization Call */
        vm.initialize();

        /* Method Functions */
        function initialize() {
          // Get the information on the table itself
          datafactory.get(initializationCallBack);

          function initializationCallBack(responseData) {
            vm.data = responseData;
          }
        }
        /* close initialize */

      }
      /*close Details*/

    }
    /* close detailsCall */

  }
  /*close detailsFactory*/

})();
