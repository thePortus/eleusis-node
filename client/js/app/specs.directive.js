(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('eleusis.app')
    .directive('eleusisSpecs', eleusisSpecs);

  /*Directive Definition*/
  function eleusisSpecs() {
    var directive = {
      templateUrl: 'js/app/specs.template.html',
      scope: {},
      controller: eleusisSpecsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisSpecsController() {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */

    /* Methods */
    vm.$onInit = initialize;

    /* Functions */
    function initialize(){

      vm.specs = [
        {
          link: 'https://https://nodejs.org/',
          label: 'Backend',
          value: 'NodeJS'
        }, {
          link: 'https://www.postgresql.org/',
          label: 'Database',
          value: 'PostgreSQL'
        }, {
          link: 'https://expressjs.com/',
          label: 'Backend Framework',
          value: 'ExpressJS'
        }, {
          link: 'https://angularjs.org/',
          label: 'Frontend Framework',
          value: 'AngularJS (1.x)'
        }, {
          link: 'https://eleusis.thePort.us/api/',
          label: 'API Endpoint',
          value: 'https://eleusis.thePort.us/api/'
        },
      ];
      vm.erd = {
        img: 'imgs/misc/eleusiserd.png',
        erd: 'assets/eleusis.pgerd'
      };
      vm.dependencies = {
        'frontend': [
          {
            link: 'https://angularjs.org/',
            label: 'angularjs'
          }, {
            link: 'https://www.npmjs.com/package/angular-animate',
            label: 'angular-animate'
          }, {
            link: 'https://www.npmjs.com/package/angular-aria',
            label: 'angular-aria'
          }, {
            link: 'https://www.npmjs.com/package/angular-messages',
            label: 'angular-messages'
          }, {
            link: 'https://ui-router.github.io/',
            label: 'angular-ui-router'
          }, {
            link: 'https://material.angular.io/',
            label: 'angular-material'
          }, {
            link: 'http://ui-grid.info/',
            label: 'angular-ui-grid'
          }, {
            link: 'https://ui-router.github.io/',
            label: 'angular-ui-router'
          },
        ],
        'backend': [
          {
            link: 'https://www.npmjs.com/package/assetmanager',
            label: 'asset-manager'
          }, {
            link: 'https://www.npmjs.com/package/body-parser',
            label: 'body-parser'
          }, {
            link: 'https://www.npmjs.com/package/cookie-parser',
            label: 'cookie-parser'
          }, {
            link: 'https://www.npmjs.com/package/csvjson',
            label: 'csvjson'
          }, {
            link: 'https://www.npmjs.com/package/debug',
            label: 'debug'
          }, {
            link: 'https://www.npmjs.com/package/express',
            label: 'express'
          }, {
            link: 'https://gulpjs.com',
            label: 'gulp'
          }, {
            link: 'https://www.npmjs.com/package/morgan',
            label: 'morgan'
          }, {
            link: 'https://www.npmjs.com/package/pg',
            label: 'pg'
          }, {
            link: 'https://www.npmjs.com/package/pg-hstore',
            label: 'pg-hstore'
          }, {
            link: 'https://www.npmjs.com/package/sequelize',
            label: 'sequelize'
          }, {
            link: 'https://www.npmjs.com/package/sequelize-auto',
            label: 'sequelize-auto'
          }, {
            link: 'https://www.npmjs.com/package/sequelize-cli',
            label: 'sequelize-cli'
          }, {
            link: 'https://www.npmjs.com/package/serve-favicon',
            label: 'serve-favicon'
          }, {
            link: 'https://www.npmjs.com/package/supervisor',
            label: 'supervisor'
          }, {
            link: 'https://www.npmjs.com/package/vis',
            label: 'vis'
          }
        ],
        'developer': [
          {
            link: 'https://www.npmjs.com/package/angular-mocks',
            label: 'angular-mocks'
          }, {
            link: 'https://www.npmjs.com/package/jasmine-core',
            label: 'jasmine-core'
          }, {
            link: 'https://www.npmjs.com/package/karma',
            label: 'karma'
          }, {
            link: 'https://www.npmjs.com/package/karma-chrome-launcher',
            label: 'karma-chrome-launcher'
          }, {
            link: 'https://www.npmjs.com/package/karma-jasmine',
            label: 'karma-jasmine'
          }, {
            link: 'https://www.npmjs.com/package/lru-cache',
            label: 'lru-cache'
          }, {
            link: 'https://www.npmjs.com/package/process-nextick-args',
            label: 'process-nextick-args'
          }, {
            link: 'https://www.npmjs.com/package/sigmund',
            label: 'sigmund'
          }, {
            link: 'https://www.npmjs.com/package/util-deprecate',
            label: 'util-deprecate'
          }
        ]
      };

    }
  }
  /*close eleusisSpecsController*/

})();
