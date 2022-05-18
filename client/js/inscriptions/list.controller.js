(function() {
  'use strict';

  angular.module('eleusis.inscriptions')
    .controller('InscriptionsListCtrl', inscriptionsListCtrl);

  function inscriptionsListCtrl(Interface, InscriptionsList) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.grid = {
      enableFiltering: true,
      enableHiding: true,
      enableSorting: true,
      showGridFooter: true,
      paginationPageSizes: [100, 250, 1000],
      paginationPageSize: 100,
      appScopeProvider: vm,
      rowTemplate:  '<div ng-click="grid.appScope.details(row.entity[\'ID\'])" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div>',
      columnDefs: [
        {field: 'IE'},
        {field: 'Inscription'},
        {field: 'Object Type'},
        {field: 'Inscription Type'},
        {field: 'Location'},
        {field: 'Date'},
        {field: 'Word Count'},
      ],
      data: null,
    };

    /* Methods */
    vm.$onInit = initialize;
    vm.details = details;

    /* Functions */
    function initialize() {
      vm.grid.data = InscriptionsList.get(initializeCB);

      function initializeCB(responseData) {
        vm.grid.data = responseData;
      }
    }

    function details(entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go('inscriptions.details', {idNum: entryId});
    }
  }

})();
