(function() {
    'use strict';

  // Module Definition
  angular.module(
    'eleusis.app',
    [
        'ui.router',
        'ngAria',
        'ngAnimate',
        'ngMaterial',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.resizeColumns',
        'eleusis.common',
        'eleusis.details',
        'eleusis.graphs',
        'eleusis.inscriptions',
        'eleusis.institutions',
        'eleusis.people',
        'eleusis.honors',
        'eleusis.networks'
    ]
  )
    .constant('APP_TITLE', 'The Networks of Roman Eleusis')
    .constant('APP_VERSION', '0.0.0')
    .constant('APP_CREDITS', 'By David Thomas')
    .constant('APP_RIGHTS', 'Copyright, © 2019')
    .config(mdThemeConfig)
    .config(mdIconConfig)
    .config(['$stateProvider', '$urlRouterProvider', configRouter]);

  /*Material Design Theme Configuration*/
  function mdThemeConfig($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('brown')
      .warnPalette('orange');
  }

  /* Material Design Icon Provider Configuration */
  function mdIconConfig($mdIconProvider) {
      $mdIconProvider
        .defaultFontSet('mdi')
        .defaultIconSet('/imgs/icons/mdi.svg');
  }

  /*UI Router Configuration*/
    function configRouter($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $urlRouterProvider.when('', '/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'js/app/home.template.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .state('inscriptions', {
          abstract: true,
          url: '/inscriptions',
          template: '<ui-view />'
        })
        .state('inscriptions.list', {
          url: '/list',
          templateUrl: 'js/inscriptions/list.template.html',
          controller: 'InscriptionsListCtrl',
          controllerAs: 'vm'
        })
        .state('inscriptions.details', {
          url: '/details/:idNum',
          params: {
            idNum: null
          },
          templateUrl: 'js/inscriptions/details.template.html',
          controller: 'InscriptionDetailsCtrl',
          controllerAs: 'vm'
        })
        .state('institutions', {
          abstract: true,
          url: '/institutions',
          template: '<ui-view />'
        })
        .state('institutions.list', {
          url: '/list',
          templateUrl: 'js/institutions/list.template.html',
          controller: 'InstitutionsListCtrl',
          controllerAs: 'vm'
        })
        .state('institutions.details', {
          url: '/details/:idNum',
          params: {
            idNum: null
          },
          templateUrl: 'js/institutions/details.template.html',
          controller: 'InstitutionDetailsCtrl',
          controllerAs: 'vm'
        })
        .state('people', {
          abstract: true,
          url: '/people',
          template: '<ui-view />'
        })
        .state('people.list', {
          url: 'list',
          templateUrl: 'js/people/list.template.html',
          controller: 'PeopleListCtrl',
          controllerAs: 'vm'
        })
        .state('people.details', {
          url: '/details/:idNum',
          params: {
            idNum: null
          },
          templateUrl: 'js/people/details.template.html',
          controller: 'PersonDetailsCtrl',
          controllerAs: 'vm'
        })
        .state('honors', {
          abstract: true,
          url: '/honors',
          template: '<ui-view />'
        })
        .state('honors.list', {
          url: '/list',
          templateUrl: 'js/honors/list.template.html',
          controller: 'HonorsListCtrl',
          controllerAs: 'vm'
        })
        .state('honors.details', {
          url: '/details/:idNum',
          params: {
            idNum: null
          },
          templateUrl: 'js/honors/details.template.html',
          controller: 'HonorDetailsCtrl',
          controllerAs: 'vm'
        })
        .state('networks', {
          url: '/networks',
          templateUrl: 'js/networks/networks.template.html',
          controller: 'NetworksCtrl',
          controllerAs: 'vm'
        });
    }

})();
