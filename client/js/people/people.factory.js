(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('eleusis.people')
    .factory('PeopleList', peopleListFactory)
    .factory('PersonDetails', personDetailsFactory)
    .factory('PersonInscriptionDetails', personInscriptionsDetailsFactory)
    .factory('PersonHonorsDetails', personHonorsDetailsFactory)
    .factory('PersonInstitutionsDetails', personInstitutionsDetailsFactory)
    .factory('PersonNetwork', personNetworkFactory);

  function peopleListFactory(Api) {
    return new PeopleListModel();

    function PeopleListModel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */

      /* Methods */
      vm.get = get;

      /* Functions */
      function get(tableFactoryCallBack) {
        // Fetching data and sending it local callback
        var api = new Api('people');
        api.get(transformDataCB);

        function transformDataCB(responseData) {
          // Function to allow (if needed) a transformation of API data before sending to display table

          // Devising 'Status' property based upon origin and Roman citizenship
          for(var x = 0; x < responseData.length; x += 1) {
            var record = responseData[x];
            if(record.Origin === 'Athens' && record['Roman Citizenship'] !== true) {
              record.Status = 'Athenian without Roman Citizenship';
            }
            else if(record.Origin === 'Athens' && record['Roman Citizenship'] === true){
              record.Status = 'Athenian with Roman Citizenship';
            }
            else if(record.Origin === 'Rome') {
              record.Status = 'Roman';
            }
            else {
              record.Status = 'Greek/Other';
            }
          }
          // Sending altered data back to controller, along with id_field and fields
          tableFactoryCallBack(responseData);
        }
      }
    }
    /*close PeopleListModel*/
  }
  /*close peopleListFactory*/

  function personDetailsFactory(Api) {
    return personDetailsCall;

    function personDetailsCall(idNum) {
      return new PersonDetailsModel(idNum);

      function PersonDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'People', value: 'people', display: true};
        vm.id_field = {label: 'ID', value: 'ID', display: true};
        vm.fields = [
          {label: 'ID', value: 'ID', display: false},
          {label: 'Person', value: 'Person', display: false},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: false},
          {label: 'Gender', value: 'Gender', display: true},
          {label: 'Status', value: 'Status', display: true},
          {label: 'Family', value: 'Family', display: true},
          {label: 'Extended Family', value: 'Extended', display: true},
          {label: 'Praenomen', value: 'Praenomen', display: false},
          {label: 'Nomen', value: 'Nomen', display: false},
          {label: 'Cognomen', value: 'Cognomen', display: false},
          {label: 'Onomos', value: 'Onomos', display: false},
          {label: 'Patronym', value: 'Patronym', display: false},
          {label: 'Deme', value: 'Deme', display: true}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(detailFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('people', idNum);
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            /* Transform data for display, if needed. Then call callBack */
            detailFactoryCallBack(responseData);
          }
          /* close transformDataCB */
        }
        /* close get */
      }
      /* close PersonDetailsModel */

    }
    /* close personDetailsCall */

  }
  /* close personDetailsFactory */

  function personInscriptionsDetailsFactory(Api) {
    return personInscriptionsDetailsCall;

    function personInscriptionsDetailsCall(idNum) {
      return new PersonInscriptionsDetailsModel(idNum);

      function PersonInscriptionsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Inscriptions Appeared In', value:'inscriptions', display: true};
        vm.id_field = {label: 'IE', value: 'ID'};
        vm.fields = [
          {label : 'IE', value: 'IE', display: true},
          {label: 'Inscription', value: 'Inscription', display: true},
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
          api = new Api('people', idNum, 'inscriptions');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
              tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close PersonInscriptionsDetailsModel */

    }
    /* close personInstriptionsDetailsCall */

  }
  /* close personInscriptionsDetailsFactory */

  function personHonorsDetailsFactory(Api) {
    return personHonorsDetailsCall;

    function personHonorsDetailsCall(idNum) {
      return new PersonHonorsDetailsModel(idNum);

      function PersonHonorsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Honors Held', value:'honors', display: true};
        vm.id_field = {label: 'ID', value: 'ID'};
        vm.fields = [
          {label : 'ID', value: 'ID', display: false},
          {label: 'Honor', value: 'Honor', display: true},
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
          api = new Api('people', idNum, 'honors');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
              tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close PersonHonorsDetailsModel */

    }
    /* close personHonorsDetailsCall */

  }
  /* close personHonorsDetailsFactory */

  function personInstitutionsDetailsFactory(Api) {
    return personInstitutionsDetailsCall;

    function personInstitutionsDetailsCall(idNum) {
      return new PersonInstitutionsDetailsModel(idNum);

      function PersonInstitutionsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Officer of Institutions', value:'institutions', display: true};
        vm.id_field = {label: 'IE', value: 'ID'};
        vm.fields = [
          {label : 'ID', value: 'ID', display: false},
          {label: 'Institution', value: 'Institution', display: true},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: true},
          {label: 'Type', value: 'Type', display: true},
          {label: 'Appearances as Offices', value: 'Appearances', display: true}
      ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(tableFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('people', idNum, 'institutions');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
              tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close PersonInstitutionsDetailsModel */

    }
    /* close personInstitutionsDetailsCall */

  }
  /* close personInstitutionsDetailsFactory */

  function personNetworkFactory(Api) {
    return personCall;

    function personCall(idNum) {
      return new PersonModel(idNum);

      function PersonModel() {
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
                color: {border: '#551600', background: '#AA5639'},
                size: 40
            },
            honors: {
                shape: 'diamond',
                color: {border: '#554200', background: '#AA9139'}
            }
          }
        };

        /* Methods */
        vm.getInfo = getInfo;
        vm.getInstitutions = getInstitutions;
        vm.getInscriptions = getInscriptions;
        vm.getHonors = getHonors;
        vm.networkGraph = networkGraph;

        /* Functions */
        function list(callBack) {
          /* Gets the info for all inscriptions and sends them to passed
          callback function */
          var api = new Api('people');
          api.get(callBack);
        }

        function getInfo(callBack) {
          /* Gets the info of this item and sends the data to passed callback
          function */
          var api = new Api('people', vm.idNum);
          api.get(callBack);
        }

        function getHonors(callBack) {
          /* Gets all honors related to this item and sends the data to passed
          callback function */
          var api = new Api('people', vm.idNum, 'honors');
          api.get(callBack);
        }

        function getInstitutions(callBack) {
          /* Gets all institutions related to this item and sends the data to passed
          callback function */
          var api = new Api('people', vm.idNum, 'institutions');
          api.get(callBack);
        }

        function getInscriptions(callBack) {
          /* Gets all people related to this item and sends the data to passed
          callback function */
          var api = new Api('people', vm.idNum, 'inscriptions');
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
              label: info[0].Person, id: info[0].ID, group: 'people'
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

            vm.getHonors(relatedHonorsCB);
          }

          function relatedHonorsCB(responseData) {
            var honors = responseData;
            for(var x = 0; x < honors.length; x += 1) {
              var honor = honors[x];
              returnData.nodes.push({
                label: honor.Honor, id: honor.ID, group: 'honors'
              });
              returnData.edges.push({
                from: sourceID, to: honor.ID
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
      /* close PersonModel */

    }
    /* close personCall */

  }
  /*close personNetworkFactory*/

})();
