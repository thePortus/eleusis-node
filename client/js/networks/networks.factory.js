(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('eleusis.networks')
    .factory('Networks', networksFactory);


  function networksFactory(Api) {
    return new NetworksModel();

    function NetworksModel() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */
      vm.networks = [
        'sponsor_to_honorand',
        'sponsor_to_person'
      ];
      vm.options = {
        'default' : {
          autoResize: true,
          height: '100%',
          width: '100%',
          locale: 'en',
          clickToUse: false,
          interaction: {hover: true},
          layout: {randomSeed: 14},
          physics: {
            forceAtlas2Based: {
              gravitationalConstant: -26,
              centralGravity: 0.005,
              springLength: 230,
              springConstant: 0.18
            },
            maxVelocity: 146,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: {
              enabled:true,
              iterations:2000,
              updateInterval:25
            }
          },
          nodes: {
              font: {color: '#000000'},
              borderWidth: 2,
              scaling: {label: {min: 12, max: 30}},
              shadow: true
          },
          edges: {
              width: 2,
              shadow: false,
              scaling: {label: {min: 12, max: 30}},
              arrows: {to:     {enabled: true, scaleFactor:1, type:'arrow'}},
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
                color: {border: '#554200', background: '#AA9139'}
            }
          }
        }
      };
      // Copying default values to table-specific options
      vm.options.sponsor_to_honorand = vm.options.default;
      vm.options.sponsor_to_person = vm.options.default;
      vm.options.coappearance = vm.options.default;


      /* Methods */
      vm.getData = getData;
      vm.sponsorToHonorand = sponsorToHonorand;
      vm.sponsorToPerson = sponsorToPerson;
      vm.coappearance = coappearance;

      /* Functions */
      function getData(graphName, callBack) {
        /* This function mediates between the API data call from the Api factory,
        and the callBack function passed to it by one of the function below which
        creates a visJs network object. Passes graphName to Api in lieu of an idNum,
        which will help Api create the url path, then sends the callBack function
        to Api.get function, which will execute it once data comes back from server.*/
        // Gets specified network and then sends CB function to API
        var api = new Api('networks', graphName);
        api.get(callBack);
      }

      function sponsorToHonorand(postDataCallBack) {
        /* Function creates the returnData object, and waits until
        data has been retrieved through various callBacks, once that finished,
        this function passes the finished returnData object filled by the
        sponsorshipCB sub-function below back to the controller which
        invokes this function */
        var returnData = {
          nodes: [],
          edges: []
        };
        // call API and pass sponsorshipCB through
        vm.getData('sponsor_to_honorand', sponsorToHonorandCB);

        function sponsorToHonorandCB(responseData) {
          /* Function takes api response data and transforms it into the Vis.js
          data object, returnData, which it then passes to postDataCallBack,
          which was passed when invoked by the controller.

          This passes through each row of flattend SQL data, which it then parses
          into nodes and edges. To above duplication in nodes, during parsing
          they are temporarily store in the uniqueNodes object, so that id value
          can quickly be checked by accessing the .keys() method. Once all data
          rows have been processed, every entry in uniqueNodes is then copied
          to returnData.nodes. This function also sets the options field,
          passing it back as as duplication is not an issue with edges, edges
          are added immediately during the loop through the data rows. Once
          returnData has been filled, it is then passed back to postDataCallBack,
          passed by the controller*/
          // Setting sponsorships to responseData for lexical reference
          var sponsorships = responseData;
          // Storing nodes by unique id in object first, before pushing to returnData array
          var uniqueNodes = {};
          for(var x = 0; x < sponsorships.length; x += 1) {
            var sponsorship = sponsorships[x];
            // Checking if sponsor has been added to uniqueNodes, if not, add them
            if(!uniqueNodes.hasOwnProperty(sponsorship['Sponsor ID'])) {
              // Sponsor group property needs to change the values of the 'Sponsor Class' field
              var sponsorGroup = null;
              // Set group to institution ...
              if(sponsorship['Sponsor Class'] === 'Institution') {
                sponsorGroup = 'institutions';
              }
              // ... or person depending on the 'Sponsor Class' field
              else if(sponsorship['Sponsor Class'] === 'Person') {
                sponsorGroup = 'people';
              }
              uniqueNodes[sponsorship['Sponsor ID']] = {
                id: sponsorship['Sponsor ID'],
                label: sponsorship.Sponsor,
                group: sponsorGroup,
                metadata : {
                  'Origin': sponsorship['Sponsor Origin'],
                  'Type': sponsorship['Sponsor Type'],
                  'Status': sponsorship['Sponsor Status'],
                  'Gender': sponsorship['Sponsor Gender'],
                  'Family': sponsorship['Sponsor Family'],
                  'Extended Family': sponsorship['Sponsor Extended Family'],
                  'Deme': sponsorship['Sponsor Deme'],
                  'Role': 'Sponsor',
                  'Uncertainty': sponsorship['Sponsor Uncertainty']

                }
              };
            }
            // Checking if honorand has been added to uniqueNodes, if not, add them
            if(!uniqueNodes.hasOwnProperty(sponsorship['Honorand ID'])) {
              uniqueNodes[sponsorship['Honorand ID']] = {
                id: sponsorship['Honorand ID'],
                label: sponsorship.Honorand,
                group: 'people',
                metadata : {
                  'Origin': sponsorship['Honorand Origin'],
                  'Type': sponsorship['Honorand Type'],
                  'Status': sponsorship['Honorand Status'],
                  'Gender': sponsorship['Honorand Gender'],
                  'Family': sponsorship['Honorand Family'],
                  'Extended Family': sponsorship['Honorand Extended Family'],
                  'Deme': sponsorship['Honorand Deme'],
                  'Role': 'Honorand',
                  'Uncertainty': sponsorship['Sponsor Uncertainty']

                }
              };
            }
            // Now creating the 'edge' object from SQL and instantly push it to the edges array
            returnData.edges.push({
              from: sponsorship['Sponsor ID'],
              to: sponsorship['Honorand ID'],
              label: sponsorship.IE,
              metadata: {
                'Inscription ID': sponsorship['Inscription ID'],
                'Inscription': sponsorship.Inscription,
                'IE': sponsorship.IE,
                'Object Type': sponsorship['Object Type'],
                'Inscription Type': sponsorship['Inscription Type'],
                'Location': sponsorship.Location,
                'Date': sponsorship.Date,
                'Date Span': sponsorship['Date Span'],
                'Word Count': sponsorship['Word Count'],
                'Character Count': sponsorship['Character Count'],
                'Text': sponsorship.Text,
                'References': sponsorship.References
              }
            });
          }
          // Copy uniqueNode objects to returnData.nodes
          var uniqueNodeKeys = Object.keys(uniqueNodes);
          for(x = 0; x < uniqueNodeKeys.length; x += 1) {
            var nodeKey = uniqueNodeKeys[x];
            returnData.nodes.push(uniqueNodes[nodeKey]);
          }
          // Invoking CB function sent from elsewhere, which is the *preferred* way to pass values back
          if(typeof postDataCallBack !== 'undefined') {
            postDataCallBack(returnData);
          }
        }
        // Data should be passed via call-back function, but returning in case that did not happen
        // warning: calling this function and expecting a return value is not a good idea.

      }
      /* close sponsorToHonorand */

      function sponsorToPerson(postDataCallBack) {
        /* Function creates the returnData object, and waits until
        data has been retrieved through various callBacks, once that finished,
        this function passes the finished returnData object filled by the
        sponsorshipCB sub-function below back to the controller which
        invokes this function */
        var returnData = {
          nodes: [],
          edges: []
        };
        // call API and pass sponsorshipCB through
        vm.getData('sponsor_to_person', sponsorToPersonCB);

        function sponsorToPersonCB(responseData) {
          /* Function takes api response data and transforms it into the Vis.js
          data object, returnData, which it then passes to postDataCallBack,
          which was passed when invoked by the controller.

          This passes through each row of flattend SQL data, which it then parses
          into nodes and edges. To above duplication in nodes, during parsing
          they are temporarily store in the uniqueNodes object, so that id value
          can quickly be checked by accessing the .keys() method. Once all data
          rows have been processed, every entry in uniqueNodes is then copied
          to returnData.nodes. This function also sets the options field,
          passing it back as as duplication is not an issue with edges, edges
          are added immediately during the loop through the data rows. Once
          returnData has been filled, it is then passed back to postDataCallBack,
          passed by the controller*/
          // Setting sponsorships to responseData for lexical reference
          var sponsorships = responseData;
          // Storing nodes by unique id in object first, before pushing to returnData array
          var uniqueNodes = {};
          for(var x = 0; x < sponsorships.length; x += 1) {
            var sponsorship = sponsorships[x];
            // Checking if sponsor has been added to uniqueNodes, if not, add them
            if(!uniqueNodes.hasOwnProperty(sponsorship['Sponsor ID'])) {
              // Sponsor group property needs to change the values of the 'Sponsor Class' field
              var sponsorGroup = null;
              // Set group to institution ...
              if(sponsorship['Sponsor Class'] === 'Institution') {
                sponsorGroup = 'institutions';
              }
              // ... or person depending on the 'Sponsor Class' field
              else if(sponsorship['Sponsor Class'] === 'Person') {
                sponsorGroup = 'people';
              }
              uniqueNodes[sponsorship['Sponsor ID']] = {
                id: sponsorship['Sponsor ID'],
                label: sponsorship.Sponsor,
                group: sponsorGroup,
                metadata : {
                  'Origin': sponsorship['Sponsor Origin'],
                  'Type': sponsorship['Sponsor Type'],
                  'Status': sponsorship['Sponsor Status'],
                  'Gender': sponsorship['Sponsor Gender'],
                  'Family': sponsorship['Sponsor Family'],
                  'Extended Family': sponsorship['Sponsor Extended Family'],
                  'Deme': sponsorship['Sponsor Deme'],
                  'Role': 'Sponsor',
                  'Uncertainty': sponsorship['Sponsor Uncertainty']

                }
              };
            }
            // Checking if honorand has been added to uniqueNodes, if not, add them
            if(!uniqueNodes.hasOwnProperty(sponsorship['Person ID'])) {
              uniqueNodes[sponsorship['Person ID']] = {
                id: sponsorship['Person ID'],
                label: sponsorship.Honorand,
                group: 'people',
                metadata : {
                  'Origin': sponsorship['Person Origin'],
                  'Type': sponsorship['Person Type'],
                  'Status': sponsorship['Person Status'],
                  'Gender': sponsorship['Person Gender'],
                  'Family': sponsorship['Person Family'],
                  'Extended Family': sponsorship['Person Extended Family'],
                  'Deme': sponsorship['Person Deme'],
                  'Role': sponsorship['Person Role'],
                  'Uncertainty': sponsorship['Sponsor Uncertainty']

                }
              };
            }
            // Now creating the 'edge' object from SQL and instantly push it to the edges array
            returnData.edges.push({
              from: sponsorship['Sponsor ID'],
              to: sponsorship['Person ID'],
              label: sponsorship.IE,
              metadata: {
                'Inscription ID': sponsorship['Inscription ID'],
                'Inscription': sponsorship.Inscription,
                'IE': sponsorship.IE,
                'Object Type': sponsorship['Object Type'],
                'Inscription Type': sponsorship['Inscription Type'],
                'Location': sponsorship.Location,
                'Date': sponsorship.Date,
                'Date Span': sponsorship['Date Span'],
                'Word Count': sponsorship['Word Count'],
                'Character Count': sponsorship['Character Count'],
                'Text': sponsorship.Text,
                'References': sponsorship.References
              }
            });
          }
          // Copy uniqueNode objects to returnData.nodes
          var uniqueNodeKeys = Object.keys(uniqueNodes);
          for(x = 0; x < uniqueNodeKeys.length; x += 1) {
            var nodeKey = uniqueNodeKeys[x];
            returnData.nodes.push(uniqueNodes[nodeKey]);
          }
          // Invoking CB function sent from elsewhere, which is the *preferred* way to pass values back
          if(typeof postDataCallBack !== 'undefined') {
            postDataCallBack(returnData);
          }
        }
        // Data should be passed via call-back function, but returning in case that did not happen
        // warning: calling this function and expecting a return value is not a good idea.

      }
      /* close sponsorToPeson */

      function coappearance(postDataCallBack) {
        /* Function creates the returnData object, and waits until
        data has been retrieved through various callBacks, once that finished,
        this function passes the finished returnData object filled by the
        sponsorshipCB sub-function below back to the controller which
        invokes this function */
        var returnData = {
          nodes: [],
          edges: []
        };
        // call API and pass sponsorshipCB through
        vm.getData('coappearance', coappearanceCB);

        function coappearanceCB(responseData) {
          /* Function takes api response data and transforms it into the Vis.js
          data object, returnData, which it then passes to postDataCallBack,
          which was passed when invoked by the controller.

          This passes through each row of flattend SQL data, which it then parses
          into nodes and edges. To above duplication in nodes, during parsing
          they are temporarily store in the uniqueNodes object, so that id value
          can quickly be checked by accessing the .keys() method. Once all data
          rows have been processed, every entry in uniqueNodes is then copied
          to returnData.nodes. This function also sets the options field,
          passing it back as as duplication is not an issue with edges, edges
          are added immediately during the loop through the data rows. Once
          returnData has been filled, it is then passed back to postDataCallBack,
          passed by the controller*/
          // Setting sponsorships to responseData for lexical reference
          var coappearances = responseData;
          // Storing nodes by unique id in object first, before pushing to returnData array
          var uniqueNodes = {};
          for(var x = 0; x < coappearances.length; x += 1) {
            var coappearance = coappearances[x];
            // Checking if sponsor has been added to uniqueNodes, if not, add them
            if(!uniqueNodes.hasOwnProperty(coappearance['Party A ID'])) {
              // Party A group property needs to change the values of the 'Sponsor Class' field
              var partyGroup = null;
              // Set group to institution ...
              if(coappearance['Party A Class'] === 'Institution') {
                partyGroup = 'institutions';
              }
              // ... or person depending on the 'Sponsor Class' field
              else if(coappearance['Party A Class'] === 'Person') {
                partyGroup = 'people';
              }
              uniqueNodes[coappearance['Party A ID']] = {
                id: coappearance['Party A ID'],
                label: coappearance['Party A'],
                group: partyGroup,
                metadata : {
                  'Origin': coappearance['Party A Origin'],
                  'Type': coappearance['Party A Type'],
                  'Status': coappearance['Party A Athenian with Roman Citizenship'],
                  'Gender': coappearance['Party A Gender'],
                  'Family': coappearance['Party A Family'],
                  'Extended Family': coappearance['Party A Extended Family'],
                  'Deme': coappearance['Party A Deme']
                }
              };
            }
            // Checking if honorand has been added to uniqueNodes, if not, add them
            if(!uniqueNodes.hasOwnProperty(coappearance['Party B ID'])) {
              uniqueNodes[coappearance['Party B ID']] = {
                id: coappearance['Party B ID'],
                label: coappearance.Honorand,
                group: 'people',
                metadata : {
                  'Origin': coappearance['Party B Origin'],
                  'Type': coappearance['Party B Type'],
                  'Status': coappearance['Party B Athenian with Roman Citizenship'],
                  'Gender': coappearance['Party B Gender'],
                  'Family': coappearance['Party B Family'],
                  'Extended Family': coappearance['Party B Extended Family'],
                  'Deme': coappearance['Party B Deme']
                }
              };
            }
            // Now creating the 'edge' object from SQL and instantly push it to the edges array
            returnData.edges.push({
              from: coappearance['Party A ID'],
              to: coappearance['Party B ID'],
              label: coappearance.IE,
              metadata: {
                'Inscription ID': coappearance['Inscription ID'],
                'Inscription': coappearance.Inscription,
                'IE': coappearance.IE,
                'Object Type': coappearance.Object,
                'Inscription Type': coappearance['Inscription Type'],
                'Location': coappearance.Location,
                'Date': coappearance.Date,
                'Date Span': coappearance['Date Span'],
                'Word Count': coappearance['Word Count'],
                'Character Count': coappearance['Character Count'],
                'Text': coappearance.Text,
                'References': coappearance.References
              }
            });
          }
          // Copy uniqueNode objects to returnData.nodes
          var uniqueNodeKeys = Object.keys(uniqueNodes);
          for(x = 0; x < uniqueNodeKeys.length; x += 1) {
            var nodeKey = uniqueNodeKeys[x];
            returnData.nodes.push(uniqueNodes[nodeKey]);
          }
          // Invoking CB function sent from elsewhere, which is the *preferred* way to pass values back
          if(typeof postDataCallBack !== 'undefined') {
            postDataCallBack(returnData);
          }
        }
        // Data should be passed via call-back function, but returning in case that did not happen
        // warning: calling this function and expecting a return value is not a good idea.

      }
      /* close coappearance */

    }
    /*close NetworksModel*/

  }
  /*close networksFactory*/

})();
