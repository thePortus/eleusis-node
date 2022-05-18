(function() {
  'use strict';

  angular.module('eleusis.honors')
    .controller('HonorsListCtrl', honorsListCtrl);

  function honorsListCtrl(Interface, HonorsList) {
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
        {field: 'Honor'},
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
      vm.grid.data = HonorsList.get(initializeCB);

      function initializeCB(responseData) {
        vm.grid.data = responseData;
      }
    }

    function details(entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go('honors.details', {idNum: entryId});
    }
  }

})();
