(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('eleusis.institutions')
    .factory('InstitutionsList', institutionsListFactory)
    .factory('InstitutionDetails', institutionDetailsFactory)
    .factory('InstitutionInscriptionDetails', institutionInscriptionsDetailsFactory)
    .factory('InstitutionHonorsDetails', institutionHonorsDetailsFactory)
    .factory('InstitutionPeopleDetails', institutionPeopleDetailsFactory)
    .factory('InstitutionNetwork', institutionNetworkFactory);

  function institutionsListFactory(Api) {
    return new InstitutionsListModel();

    function InstitutionsListModel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */

      /* Methods */
      vm.get = get;

      /* Functions */
      function get(tableFactoryCallBack) {
        // Fetching data and sending it local callback
        var api = new Api('institutions');
        api.get(transformDataCB);

        function transformDataCB(responseData) {
          // Function to allow (if needed) a transformation of API data before sending to display table

          // Alter the type of institution for display
          for(var x = 0; x < responseData.length; x += 1) {
            var record = responseData[x];
            if(record.Type === 'Public') {
              record.Type = 'Public Assembly';
            }
            else if(record.Type === 'Private') {
              record.Type = 'Private Group';
            }
          }

          // Sending altered data back to controller, along with id_field and fields
          tableFactoryCallBack(responseData);
        }
      }
    }
    /*close InstitutionsListModel*/

  }
  /*close institutionsListFactory*/

  function institutionDetailsFactory(Api) {
    return institutionDetailsCall;

    function institutionDetailsCall(idNum) {
      return new InstitutionDetailsModel(idNum);

      function InstitutionDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Institutions', value: 'institutions', display: true};
        vm.id_field = {label: 'ID', value: 'ID', display: true};
        vm.fields = [
          {label: 'ID', value: 'ID', display: false},
          {label: 'Institution', value: 'Institution', display: true},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: true},
          {label: 'Type', value: 'Type', display: true}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(detailFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('institutions', idNum);
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            /* Transform data for display, if needed. Then call callBack */
            detailFactoryCallBack(responseData);
          }
          /* close transformDataCB */
        }
        /* close get */
      }
      /* close InstitutionDetailsModel */

    }
    /* close institutionDetailsCall */

  }
  /* close institutionDetailsFactory */

  function institutionInscriptionsDetailsFactory(Api) {
    return institutionInscriptionsDetailsCall;

    function institutionInscriptionsDetailsCall(idNum) {
      return new InstitutionInscriptionsDetailsModel(idNum);

      function InstitutionInscriptionsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Inscriptions Sponsored', value:'inscriptions', display: true};
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
          api = new Api('institutions', idNum, 'inscriptions');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /* close InstitutionInscriptionsDetailsModel */

    }
    /* close institutionInscriptionsDetailsCall */

  }
  /* close institutionInscriptionsDetailsFactory */

  function institutionHonorsDetailsFactory(Api) {
    return institutionHonorsDetailsCall;

    function institutionHonorsDetailsCall(idNum) {
      return new InstitutionHonorsDetailsModel(idNum);

      function InstitutionHonorsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Institution Offices', value: 'honors', display: true};
        vm.id_field = {label: 'IE', value: 'ID', display: true};
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
          api = new Api('institutions', idNum, 'honors');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /*close InstitutionHonorsDetailsModel*/

    }
    /* close institutionHonorsDetailsCall */

  }
  /*close institutionHonorsDetailsFactory*/

  function institutionPeopleDetailsFactory(Api) {
    return institutionPeopleDetailsCall;

    function institutionPeopleDetailsCall(idNum) {
      return new InstitutionPeopleDetailsModel(idNum);

      function InstitutionPeopleDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Institution Officers', value:'officers', display: true};
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
          {label: 'Role', value: 'Role', display: false},
          {label: 'Uncertain Person', value: 'Uncertain Person', display: false}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(tableFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('institutions', idNum, 'officers');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /*close InstitutionPeopleDetailsModel*/

    }
    /* close institutionPeopleDetailsCall */

  }
  /*close institutionPeopleDetailsFactory*/

  function institutionNetworkFactory(Api) {
    return institutionCall;

    function institutionCall(idNum) {
      return new InstitutionModel(idNum);

      function InstitutionModel() {
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
                shape: 'square',
                size: 40
            },
            people: {
                shape: 'dot',
                color: {border: '#551600', background: '#AA5639'}
            },
            honors: {
                shape: 'diamond',
                color: {border: '#554200', background: '#AA9139'}
            }
          }
        };

        /* Methods */
        vm.getInfo = getInfo;
        vm.getInscriptions = getInscriptions;
        vm.getPeople = getPeople;
        vm.getInscriptionsPeople = getInscriptionsPeople;
        vm.getHonors = getHonors;
        vm.getHonorsPeople = getHonorsPeople;
        vm.networkGraph = networkGraph;

        /* Functions */
        function list(callBack) {
          /* Gets the info for all inscriptions and sends them to passed
          callback function */
          var api = new Api('institutions');
          api.get(callBack);
        }

        function getInfo(callBack) {
          /* Gets the info of this item and sends the data to passed callback
          function */
          var api = new Api('institutions', vm.idNum);
          api.get(callBack);
        }

        function getHonors(callBack) {
          /* Gets all honors related to this item and sends the data to passed
          callback function */
          var api = new Api('institutions', vm.idNum, 'honors');
          api.get(callBack);
        }

        function getInscriptions(callBack) {
          /* Gets all institutions related to this item and sends the data to passed
          callback function */
          var api = new Api('institutions', vm.idNum, 'inscriptions');
          api.get(callBack);
        }

        function getPeople(callBack) {
          /* Gets all people related to this item and sends the data to passed
          callback function */
          var api = new Api('institutions', vm.idNum, 'officers');
          api.get(callBack);
        }

        function getInscriptionsPeople(callBack) {
          /* Gets all people holding offices of the institution */
          var api = new Api('institutions', vm.idNum, 'inscriptions_people');
          api.get(callBack);
        }

        function getHonorsPeople(callBack) {
          /* Gets all people attached to institution honors */
          var api = new Api('institutions', vm.idNum, 'honors_people');
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

          function hasNode(node_id) {
            /* Checks if node already exists in returnData */
            for(var i = 0; i < returnData.nodes.length; i += 1) {
              var currentNode = returnData.nodes[i];
              if(currentNode.id === node_id) {return true;}
            }
            return false;
          }

          // Returns the populated values of returnData below (after CB functions)

          function relatedInfoCB(responseData) {
            var info = responseData;
            returnData.nodes.push({
              label: info[0].Institution, id: info[0].ID, group: 'institutions'
            });
            sourceID = info[0].ID;
            nodeCounter += 1;

            // Calling other methods here, to ensure they go after info
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

            vm.getHonorsPeople(relatedHonorsPeopleCB);
          }

          function relatedHonorsPeopleCB(responseData) {
            var honors_people = responseData;
            for(var x = 0; x < honors_people.length; x += 1) {
              var honor_person = honors_people[x];
              if(!hasNode(honor_person['Person ID'])) {
                returnData.nodes.push({
                  label: honor_person.Person, id: honor_person['Person ID'], group: 'people'
                });
              }
              returnData.edges.push({
                from: honor_person['Honor ID'], to: honor_person['Person ID']
              });
              nodeCounter += 1;
            }

            vm.getInscriptionsPeople(relatedInscriptionsPeopleCB);
          }

          function relatedInscriptionsPeopleCB(responseData) {
            var inscriptions_people = responseData;
            for(var x = 0; x < inscriptions_people.length; x += 1) {
              var inscription_person = inscriptions_people[x];
              if(!hasNode(inscription_person['Person ID'])) {
                returnData.nodes.push({
                  label: inscription_person.Person, id: inscription_person['Person ID'], group: 'people'
                });
              }
              returnData.edges.push({
                from: inscription_person['Inscription ID'], to: inscription_person['Person ID']
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
      /* close InstitutionModel */

    }
    /* close institutionCall */

  }
  /*close institutionNetworkFactory*/

})();
