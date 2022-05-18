(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('eleusis.graphs')
    .directive('eleusisNetworkGraph', eleusisNetworkGraph);

  /*Directive Definition*/
  function eleusisNetworkGraph() {
    var directive = {
      templateUrl: 'js/graphs/network.template.html',
      scope: {
        datafunction: '=',
        options: '='
      },
      controller: eleusisNetworkGraphController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisNetworkGraphController(Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.container = null;
    vm.network = null;
    vm.data = {
      nodes: [],
      edges: []
    };

    /* Methods */
    vm.$onInit = initialize;

    /* Functions */
    function initialize() {

      // build network graph using vis and send cb function
      var results = vm.datafunction(initCB);

      function initCB(responseData) {
        vm.container = document.getElementById('visnetworkgraph');
        vm.data.nodes = new vis.DataSet(responseData.nodes);
        vm.data.edges = new vis.DataSet(responseData.edges);
        vm.network = new vis.Network(vm.container, vm.data, vm.options);
        // define actions with cb functions
        vm.network.on('doubleClick', clickActionCB);
        vm.network.on("stabilizationProgress", stabilizationProgress);
        vm.network.once("stabilizationIterationsDone", stabilizationIterationsDone);

        function clickActionCB(params) {
          var node_id = this.getNodeAt(params.pointer.DOM);
          var node = vm.data.nodes.get(node_id);

          if(node.group !== 'entity') {
            Interface.go(node.group + '.details', {idNum: node_id});
          }
        }

        function stabilizationProgress(params) {
          var maxWidth = 496;
          var minWidth = 20;
          var widthFactor = params.iterations/params.total;
          var width = Math.max(minWidth,maxWidth * widthFactor);

          document.getElementById('vis-bar').style.width = width + 'px';
          document.getElementById('vis-text').innerHTML = Math.round(widthFactor*100) + '%';
        }

        function stabilizationIterationsDone() {
          document.getElementById('vis-text').innerHTML = '100%';
          document.getElementById('vis-bar').style.width = '496px';
          document.getElementById('vis-loading-bar').style.opacity = 0;
          // really clean the dom element
          setTimeout(function () {document.getElementById('vis-loading-bar').style.display = 'none';}, 500);
        }

      }
    }

  }
  /*close eleusisNetworkGraphController*/

})();
