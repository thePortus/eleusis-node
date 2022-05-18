(function() {
  'use strict';

  angular.module('eleusis.people')
    .controller('PeopleListCtrl', peopleListCtrl);

  function peopleListCtrl(Interface, PeopleList) {
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
        {field: 'Person'},
        {field: 'Origin'},
        {field: 'Category'},
        {field: 'Gender'},
        {field: 'Status'},
        {field: 'Family'},
        {field: 'Extended Family'},
        {field: 'Deme'}
      ],
      data: null,
    };

    /* Methods */
    vm.$onInit = initialize;
    vm.details = details;

    /* Functions */
    function initialize() {
      vm.grid.data = PeopleList.get(initializeCB);

      function initializeCB(responseData) {
        vm.grid.data = responseData;
      }
    }

    function details(entryId) {
      /* Goes to the details page for a selected entry. */
      Interface.go('people.details', {idNum: entryId});
    }
  }

})();
