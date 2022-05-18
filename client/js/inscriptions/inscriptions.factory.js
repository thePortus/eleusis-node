(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('eleusis.inscriptions')
    .factory('InscriptionsList', inscriptionsListFactory)
    .factory('InscriptionDetails', inscriptionDetailsFactory)
    .factory('InscriptionHonorsDetails', inscriptionHonorsDetailsFactory)
    .factory('InscriptionInstitutionsDetails', inscriptionInstitutionsDetailsFactory)
    .factory('InscriptionPeopleDetails', inscriptionPeopleDetailsFactory)
    .factory('InscriptionNetwork', inscriptionNetworkFactory);

  function inscriptionsListFactory(uiGridConstants, Api) {
    return new InscriptionsListModel();

    function InscriptionsListModel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */

      /* Methods */
      vm.get = get;

      /* Functions */
      function get(tableFactoryCallBack) {
        // Fetching data and sending it local callback
        var api = new Api('inscriptions');
        api.get(transformDataCB);

        function transformDataCB(responseData) {
          // Changes the date to a string with either BCE or CE for era
          for(var x = 0; x < responseData.length; x += 1) {
            // If date is BCE...
            if(responseData[x].Date < 0) {
              // Make positive num, then convert to string and add era
              var new_date = responseData[x].Date * -1;
              new_date = new_date.toString() + ' BCE';
              responseData[x].Date = new_date;
            }
            // If date is CE....
            else {
              responseData[x].Date = responseData[x].Date.toString() + ' CE';
            }
          }
          // Sending altered data back to controller
          tableFactoryCallBack(responseData);
        }
      }
    }
    /*close InscriptionsListModel*/

  }
  /*close inscriptionsListFactory*/

  function inscriptionDetailsFactory(Api) {
    return inscriptionDetailsCall;

    function inscriptionDetailsCall(idNum) {
      return new InscriptionDetailsModel(idNum);

      function InscriptionDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Inscriptions', value: 'inscriptions', display: true};
        vm.id_field = {label: 'ID', value: 'ID', display: true};
        vm.fields = [
          {label: 'IE', value: 'IE', display: false},
          {label: 'Inscription', value: 'Inscription', display: false},
          {label: 'ID', value: 'ID', display: false},
          {label: 'Object', value: 'Object Type', display: true},
          {label: 'Category', value: 'Inscription Type', display: true},
          {label: 'Location', value: 'Location', display: true},
          {label: 'Date', value: 'Date', display: true},
          {label: 'Date Span', value: 'Date Span', display: true},
          {label: 'Word Count', value: 'Word Count', display: true},
          {label: 'Character Count', value: 'Character Count', display: true},
          {label: 'Features', value: 'Features', display: true},
          {label: 'References', value: 'References', display: true},
          {label: 'Text', value: 'Raw Text', display: false}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(detailFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('inscriptions', idNum);
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            /* Transform data for display, if needed. Then call callBack */
            detailFactoryCallBack(responseData);
          }
          /* close transformDataCB */
        }
        /* close get */
      }
      /*close InscriptionDetailsModel*/

    }
    /* close inscriptionDetailsCall */

  }
  /*close inscriptionDetailsFactory*/

  function inscriptionHonorsDetailsFactory(Api) {
    return inscriptionHonorsDetailsCall;

    function inscriptionHonorsDetailsCall(idNum) {
      return new InscriptionHonorsDetailsModel(idNum);

      function InscriptionHonorsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Inscription Honors', value: 'honors', display: true};
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
          api = new Api('inscriptions', idNum, 'honors');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /*close InscriptionHonorsDetailsModel*/

    }
    /* close inscriptionHonorsDetailsCall */

  }
  /*close inscriptionHonorsDetailsFactory*/

  function inscriptionInstitutionsDetailsFactory(Api) {
    return inscriptionInstitutionsDetailsCall;

    function inscriptionInstitutionsDetailsCall(idNum) {
      return new InscriptionInstitutionsDetailsModel(idNum);

      function InscriptionInstitutionsDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'Institutional Sponsors', value:'institutions', display: true};
        vm.id_field = {label: 'IE', value: 'ID'};
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
          api = new Api('inscriptions', idNum, 'institutions');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /*close InscriptionInstitutionsDetailsModel*/

    }
    /* close inscriptionInstitutionsDetailsCall */

  }
  /*close inscriptionInstitutionsDetailsFactory*/

  function inscriptionPeopleDetailsFactory(Api) {
    return inscriptionPeopleDetailsCall;

    function inscriptionPeopleDetailsCall(idNum) {
      return new InscriptionPeopleDetailsModel(idNum);

      function InscriptionPeopleDetailsModel() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.idNum = idNum ;
        vm.tableName = {label: 'People Appearing', value:'people', display: true};
        vm.id_field = {label: 'IE', value: 'ID'};
        vm.fields = [
          {label : 'ID', value: 'ID', display: false},
          {label: 'Person', value: 'Person', display: true},
          {label: 'Origin', value: 'Origin', display: true},
          {label: 'Category', value: 'Category', display: true},
          {label: 'Gender', value: 'Gender', display: true},
          {label: 'Person Status', value: 'Person Status', display: true},
          {label: 'Family', value: 'Family', display: true},
          {label: 'Extended Family', value: 'Extended Family, display: true'},
          {label: 'Roman Nomenclature', value: 'Roman Nomenclature', display: true},
          {label: 'Greek Nomenclature', value: 'Greek Nomenclature', display: true},
          {label: 'Deme', value: 'Deme', display: true},
          {label: 'Role', value: 'Role', display: true},
          {label: 'Uncertain Person', value: 'Uncertain Person', display: false}
        ];

        /* Methods */
        vm.get = get;

        /* Functions */
        function get(tableFactoryCallBack) {
          var api = null;
          // Fetching data on specific item
          api = new Api('inscriptions', idNum, 'people');
          api.get(transformDataCB);

          function transformDataCB(responseData) {
            tableFactoryCallBack(responseData);
          }
        }
        /* close get */
      }
      /*close InscriptionPeopleDetailsModel*/

    }
    /* close inscriptionPeopleDetailsCall */

  }
  /*close inscriptionPeopleDetailsFactory*/

  function inscriptionNetworkFactory(Api) {
    return inscriptionCall;

    function inscriptionCall(idNum) {
      return new InscriptionModel(idNum);

      function InscriptionModel() {
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
              shape: 'hexagon',
              size: 40
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
                color: {border: '#554200', background: '#AA9139'}
            }
          }
        };

        /* Methods */
        vm.getInfo = getInfo;
        vm.getPeople = getPeople;
        vm.getPeopleHonors = getPeopleHonors;
        vm.getInstitutions = getInstitutions;
        vm.getInstitutionsHonors = getInstitutionsHonors;
        vm.getHonors = getHonors;
        vm.networkGraph = networkGraph;

        /* Functions */
        function list(callBack) {
          /* Gets the info for all inscriptions and sends them to passed
          callback function */
          var api = new Api('inscriptions');
          api.get(callBack);
        }

        function getInfo(callBack) {
          /* Gets the info of this item and sends the data to passed callback
          function */
          var api = new Api('inscriptions', vm.idNum);
          api.get(callBack);
        }

        function getPeople(callBack) {
          /* Gets all people related to this item and sends the data to passed
          callback function */
          var api = new Api('inscriptions', vm.idNum, 'people');
          api.get(callBack);
        }

        function getPeopleHonors(callBack) {
          /* Gets all honors displayed by people in this inscription */
          var api = new Api('inscriptions', vm.idNum, 'people_honors');
          api.get(callBack);
        }

        function getInstitutions(callBack) {
          /* Gets all institutions related to this item and sends the data to passed
          callback function */
          var api = new Api('inscriptions', vm.idNum, 'institutions');
          api.get(callBack);
        }

        function getInstitutionsHonors(callBack) {
          /* Gets all institutions connected to honors displayed */
          var api = new Api('inscriptions', vm.idNum, 'institutions_honors');
          api.get(callBack);
        }

        function getHonors(callBack) {
          /* Gets all honors related to this item and sends the data to passed
          callback function */
          var api = new Api('inscriptions', vm.idNum, 'honors');
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

          function hasNode(node_id) {
            /* Checks if node already exists in returnData */
            for(var i = 0; i < returnData.nodes.length; i += 1) {
              var currentNode = returnData.nodes[i];
              if(currentNode.id === node_id) {return true;}
            }
            return false;
          }

          vm.getInfo(relatedInfoCB);

          // Returns the populated values of returnData below (after CB functions)

          function relatedInfoCB(responseData) {
            var info = responseData;
            returnData.nodes.push({
              label: info[0].Inscription, id: info[0].ID, group: 'inscriptions'
            });
            sourceID = info[0].ID;
            nodeCounter += 1;

            // Calling other methods here, to ensure they go after info
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
            vm.getPeopleHonors(relatedPeopleHonorsCB);
          }

          function relatedPeopleHonorsCB(responseData) {
            var people_honors = responseData;
            for(var x = 0; x < people_honors.length; x += 1) {
              var person_honor = people_honors[x];
              if(!hasNode(person_honor['Honor ID'])){
                returnData.nodes.push({
                  label: person_honor.Honor, id: person_honor['Honor ID'], group: 'honors'
                });
              }
              returnData.edges.push({
                from: person_honor['Person ID'], to: person_honor['Honor ID']
              });
              nodeCounter += 1;
            }
            vm.getInstitutions(relatedInstitutionsCB);
          }

          function relatedInstitutionsCB(responseData) {
            var institutions = responseData;
            for(var x = 0; x < institutions.length; x += 1) {
              var institution = institutions[x];
              if(!hasNode(institution.ID)) {
                returnData.nodes.push({
                  label: institution.Institution, id: institution.ID, group: 'institutions'
                });
              }
              returnData.edges.push({
                from: sourceID, to: institution.ID
              });
              nodeCounter += 1;
            }
            vm.getInstitutionsHonors(relatedInstitutionsHonorsCB);
          }

          function relatedInstitutionsHonorsCB(responseData) {
            var institutions_honors = responseData;
            for(var x = 0; x < institutions_honors.length; x += 1) {
              var institution_honor = institutions_honors[x];
              if(institution_honor['Institution ID'] !== null) {
                if(!hasNode(institution_honor['Institution ID'])){
                  returnData.nodes.push({
                    label: institution_honor.Institution, id: institution_honor['Institution ID'], group: 'institutions'
                  });
                }
                returnData.edges.push({
                  from: institution_honor['Institution ID'], to: institution_honor['Honor ID']
                });
                nodeCounter += 1;
              }
            }
            vm.getHonors(relatedHonorsCB);
          }

          function relatedHonorsCB(responseData) {
            var honors = responseData;
            for(var x = 0; x < honors.length; x += 1) {
              var honor = honors[x];
              if(!hasNode(honor.ID)) {
                returnData.nodes.push({
                  label: honor.Honor, id: honor.ID, group: 'honors'
                });
                returnData.edges.push({
                  from: sourceID, to: honor.ID
                });
              }
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
      /* close inscriptionModel */

    }
    /* close inscriptionCall */

  }
  /*close inscriptionNetworkFactory*/

})();
