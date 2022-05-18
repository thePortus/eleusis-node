(function() {
  'use strict';

  angular.module('eleusis.institutions')
    .controller('InstitutionsListCtrl', institutionsListCtrl);

  function institutionsListCtrl(Interface, InstitutionsList) {
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
        {field: 'ID'},
        {field: 'Institution'},
        {field: 'Origin'},
        {field: 'Category'},
        {field: 'Type'}
      ],
      data: null,
    };

    /* Methods */
    vm.$onInit = initialize;
    vm.details = details;

    /* Functions */
    function initialize() {
      vm.grid.data = InstitutionsList.get(initializeCB);

      function initializeCB(responseData) {
        vm.grid.data = responseData;
      }
    }

    function details(entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go('institutions.details', {idNum: entryId});
    }
  }

})();
