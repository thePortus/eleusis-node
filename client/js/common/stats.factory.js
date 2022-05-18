(function() {
  'use strict';

  angular.module('eleusis.common')
    .factory('Stats', statsFactory);

    /*Stats factory function definition*/
    function statsFactory($http) {
      return statsCall;

    function statsCall(table) {
      /* table is list of objects representing data rows*/
      return new Stats(table);

      function Stats(table, fields) {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.data = [];

        /* Methods */
        vm.initialize = initialize;
        vm.summarize = summarize;

        /* Initialization Call */
        vm.initialize();

        /*Functions*/
        function initialize() {
          vm.data = table;
        }

        function summarize(fields) {
          /* fields is a list of strings designating the fields to be calculated */
          var tallies = {};
          /* loop through fields to make empty objs at keywords in tallies */
          for(var i = 0; i < fields.length; i += 1) {
            tallies[fields[i]] = {};
          }

          /* loop each row */
          for(i = 0; i < vm.data.length; i += 1) {
            var rowData = vm.data[i];

            /* loop each column */
            for(var h = 0; h < fields.length; h += 1) {
              var currentCol = fields[h];
              var currentVal = rowData[currentCol];
              /* determine if value has already been added to tallies, if so, add to tally */
              if(tallies[currentCol].hasOwnProperty(currentVal)) {
                tallies[currentCol][currentVal] += 1;
              }
              /* otherwise, start tally by creating a value at that keyword of 1 */
              else {
                tallies[currentCol][currentVal] = 1;
              }
            }
          }

          return tallies;
        }

    }
    /*close Stats*/

  }
  /*close statsCall*/

}
/*close statsFactory*/

})();
