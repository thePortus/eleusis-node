(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('eleusis.honors')
    .factory('HonorsList', honorsListFactory)
    .factory('HonorDetails', honorDetailsFactory)
    .factory('HonorInscriptionsDetails', honorInscriptionsDetailsFactory)
    .factory('HonorInstitutionsDetails', honorInstitutionsDetailsFactory)
    .factory('HonorPeopleDetails', honorPeopleDetailsFactory)
    .factory('HonorNetwork', honorNetworkFactory);

  function honorsListFactory(Api) {
    return new HonorsListModel();

    function HonorsListModel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */

      /* Methods */
      vm.get = get;

      /* Functions */
      function get(tableFactoryCallBack) {
        // Fetching data and sending it local callback
        var api = new Api('honors');
        api.get(transformDataCB);

        function transformDataCB(responseData) {
          // Function to allow (if needed) a transformation of API data before sending to display table

          // No transformation needed yet

          // Sending altered data back to controller, along with id_field and fields
          tableFactoryCallBack(responseData);
        }
      }
    }
    /* close HonorsListModel */

  }
  /* close honorsListFactory */

  function honorDetailsFactory(Api) {
    return honorDetailsCall;

    function honorDetailsCall(idNum) {
      return new HonorDetailsModel(idNum);

      function HonorDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Honors', value: 'honors', display: true};
        vm.id_field = {label: 'ID', value: 'ID', display: true};
        vm.fields = [
          {label: 'ID', value: 'ID', display: false},
          {label: 'Honor', value: 'Honor', display: true},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: true},
          {label: 'Type', value: 'Type', display: true},
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(detailFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('honors', idNum);
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            /* Transform data for display, if needed. Then call callBack */
            detailFactoryCallBack(responseData);
          }
          /* close transformDataCB */
        }
        /* close get */
      }
      /* close HonorDetailsModel */

    }
    /* close honorDetailsCall */

  }
  /* close honorDetailsFactory */

  function honorInscriptionsDetailsFactory(Api) {
    return honorInscriptionsDetailsCall;

    function honorInscriptionsDetailsCall(idNum) {
      return new HonorInscriptionsDetailsModel(idNum);

      function HonorInscriptionsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Inscription Appearances', value:'inscriptions', display: true};
        vm.id_field = {label: 'IE', value: 'ID'};
        vm.fields = [
          {label : 'IE', value: 'IE', display: true},
          {label: 'Inscription', value: 'Inscription', display: true},
          {label: 'Honor Appearances', value: 'Appearances', display: true},
          {label: 'ID', value: 'ID', display: false},
          {label: 'Object', value: 'Object Type', display: true},
          {label: 'Category', value: 'Inscription Type', display: true},
          {label: 'Location', value: 'Inscription Type', display: false},
          {label: 'Date', value: 'Date', display: true},
          {label: 'Date Span', value: 'Date Span', display: false},
          {label: 'Word Count', value: 'Word Count', display: false},
          {label: 'Character Count', value: 'Character Count', display: false},
          {label: 'Features', value: 'Features', display: false},
          {label: 'References', value: 'References', display: false},
          {label: 'Text', value: 'Text', display: false}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(tableFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('honors', idNum, 'inscriptions');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close HonorInscriptionsDetailsModel */

    }
    /* close honorInscriptionsDetailsCall */

  }
  /* close honorInscriptionsDetailsFactory */

  function honorInstitutionsDetailsFactory(Api) {
    return honorInstitutionsDetailsCall;

    function honorInstitutionsDetailsCall(idNum) {
      return new HonorInstitutionsDetailsModel(idNum);

      function HonorInstitutionsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Related Institution', value: 'institutions', display: true};
        vm.id_field = {label: 'IE', value: 'ID', display: true};
        vm.fields = [
          {label : 'ID', value: 'ID', display: false},
          {label: 'Institution', value: 'Institution', display: true},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: true},
          {label: 'Type', value: 'Type', display: true}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(tableFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('honors', idNum, 'institutions');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close HonorInstitutionsDetailsModel */

    }
    /* close honorInstitutionsDetailsCall */

  }
  /* close honorInstitutionsDetailsFactory */

  function honorPeopleDetailsFactory(Api) {
    return honorPeopleDetailsCall;

    function honorPeopleDetailsCall(idNum) {
      return new HonorPeopleDetailsModel(idNum);

      function HonorPeopleDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'People Appearing with Honor', value:'people', display: true};
        vm.id_field = {label: 'IE', value: 'ID'};
        vm.fields = [
          {label : 'ID', value: 'ID', display: false},
          {label: 'Person', value: 'Person', display: true},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: true},
          {label: 'Gender', value: 'Gender', display: true},
          {label: 'Person Status', value: 'Person Status', display: true},
          {label: 'Family', value: 'Family', display: true},
          {label: 'Extended Family', value: 'Extended Family', display: false},
          {label: 'Roman Nomenclature', value: 'Roman Nomenclature', display: false},
          {label: 'Greek Nomenclature', value: 'Greek Nomenclature', display: false},
          {label: 'Deme', value: 'Deme', display: false},
          {label: 'Appearances with Honor', value: 'Appearances', display: true},
          {label: 'Uncertain Person', value: 'Uncertain Person', display: false}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(tableFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('honors', idNum, 'people');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close HonorPeopleDetailsModel */

    }
    /* close honorPeopleDetailsCall */

  }
  /* close honorPeopleDetailsFactory */

  function honorNetworkFactory(Api) {
    return honorCall;

    function honorCall(idNum) {
      return new HonorModel(idNum);

      function HonorModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.options = {
          autoResize: true,
          height: '100%',
          width: '100%',
          locale: 'en',
          clickToUse: false,
          interaction: {hover: true},
          nodes: {
              shape: 'dot',
              font: {
                  color: '#000000'
              },
              borderWidth: 2,
              scaling: {
                label: {
                  min: 8,
                  max: 20
                }
              },
              shadow: true
          },
          edges: {
              width: 2,
              shadow: true
          },
          groups: {
            inscriptions: {
              color: {border: '#003B1F', background: '#76B295'},
              shape: 'hexagon'
            },
            institutions: {
                color: {border:'#0D083B', background: '#383276'},
                shape: 'square'
            },
            people: {
                shape: 'dot',
                color: {border: '#551600', background: '#AA5639'}
            },
            honors: {
                shape: 'diamond',
                color: {border: '#554200', background: '#AA9139'},
                size: 40
            }
          }
        };

        /* Methods */
        vm.getInfo = getInfo;
        vm.getInstitutions = getInstitutions;
        vm.getPeople = getPeople;
        vm.getInscriptions = getInscriptions;
        vm.networkGraph = networkGraph;

        /* Functions */
        function list(callBack) {
          /* Gets the info for all inscriptions and sends them to passed
          callback function */
          var api = new Api('honors');
          api.get(callBack);
        }

        function getInfo(callBack) {
          /* Gets the info of this item and sends the data to passed callback
          function */
          var api = new Api('honors', vm.idNum);
          api.get(callBack);
        }

        function getInscriptions(callBack) {
          /* Gets all honors related to this item and sends the data to passed
          callback function */
          var api = new Api('honors', vm.idNum, 'inscriptions');
          api.get(callBack);
        }

        function getInstitutions(callBack) {
          /* Gets all institutions related to this item and sends the data to passed
          callback function */
          var api = new Api('honors', vm.idNum, 'institutions');
          api.get(callBack);
        }

        function getPeople(callBack) {
          /* Gets all people related to this item and sends the data to passed
          callback function */
          var api = new Api('honors', vm.idNum, 'people');
          api.get(callBack);
        }

        function networkGraph(postDataCallBack) {
          /* Calls various API methods of this factory and sends callback functions
          which read the response data and populate the returnData object. This
          method is meant to generate all related data about this item for a
          D3 force-directed graph */
          var returnData = {
            nodes: [],
            edges: []
          };
          // The number to use to link to the current node
          var nodeCounter = 0;
          var sourceID = 0;

          vm.getInfo(relatedInfoCB);

          // Returns the populated values of returnData below (after CB functions)

          function relatedInfoCB(responseData) {
            var info = responseData;
            returnData.nodes.push({
              label: info[0].Honor, id: info[0].ID, group: 'honors'
            });
            sourceID = info[0].ID;
            nodeCounter += 1;

            // Calling other methods here, to ensure they go after info
            vm.getInstitutions(relatedInstitutionsCB);
          }

          function relatedInstitutionsCB(responseData) {
            var institutions = responseData;
            for(var x = 0; x < institutions.length; x += 1) {
              var institution = institutions[x];
              returnData.nodes.push({
                label: institution.Institution, id: institution.ID, group: 'institutions'
              });
              returnData.edges.push({
                from: sourceID, to: institution.ID
              });
              nodeCounter += 1;
            }

            vm.getPeople(relatedPeopleCB);
          }

          function relatedPeopleCB(responseData) {
            var people = responseData;
            for(var x = 0; x < people.length; x += 1) {
              var person = people[x];
              returnData.nodes.push({
                label: person.Person, id: person.ID, group: 'people'
              });
              returnData.edges.push({
                from: sourceID, to: person.ID
              });
              nodeCounter += 1;
            }

            vm.getInscriptions(relatedInscriptionsCB);
          }

          function relatedInscriptionsCB(responseData) {
            var inscriptions = responseData;
            for(var x = 0; x < inscriptions.length; x += 1) {
              var inscription = inscriptions[x];
              returnData.nodes.push({
                label: inscription.Inscription, id: inscription.ID, group: 'inscriptions'
              });
              returnData.edges.push({
                from: sourceID, to: inscription.ID
              });
              nodeCounter += 1;
            }

            // Once all data is in, run any callback function passed from elsewhere
            if(typeof postDataCallBack !== 'undefined') {
              postDataCallBack(returnData);
            }
          }

          return returnData;
        }
        /* close getRelatedEntities */

      }
      /* close HonorModel */

    }
    /* close honorCall */

  }
  /*close honorNetworkFactory*/

})();
