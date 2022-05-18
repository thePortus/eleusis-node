(function() {
  'use strict';

  angular.module('eleusis.app')
    .factory('Bibliography', bibliographyFactory);

    /*Table factory function definition*/
    function bibliographyFactory($http) {
      return bibliographyCall;

    function bibliographyCall() {
      return new Bibliography();

      function Bibliography() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */

        /* Methods */
        vm.initialize = initialize;
        vm.get = get;
        /* Initialization Call */
        vm.initialize();

        /* Functions */
        function initialize() {
        }

        function get(itemFactoryCallBack) {
          /* Loads bibliography from .txt file and splits into array of entries */
          var path = '/assets/bibliography.json';

          $http.get(path)
            // retrieve data
            .then(get_info_complete)
            // skip errors
            .catch({});

            function get_info_complete(response) {
              itemFactoryCallBack(response.data.sort());
            }
        }
        /* close get */
    }
    /*close Bibliography*/

  }
  /*close BibliographyCall*/

}
/*close bibliographyFactory*/

})();
