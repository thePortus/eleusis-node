const gulp = require('gulp');

function moveFrontEnd(cb) {
  /* Default task moves front-end dependencies from node_modules into the
  'external' directory inside the client folder, making them accessible to
  the angular views. List of directories to be moved are stored in dependencyList,
  each with a source and destination directory. */

  var sourceRoot = 'node_modules/';
  var destinationRoot = 'client/external/';
  var dependencyList = [
    'angular',
    '@uirouter/angularjs/release',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'vis/dist',
    'angular-ui-grid',
    'angular-ui-grid/fonts'
  ];

  console.log("Moving frontend packages to client/external");
  for(var x = 0; x < dependencyList.length; x += 1) {
    var dependency = dependencyList[x];
    var source = sourceRoot + dependency + '/*.**';
    var destination = destinationRoot + dependency + '/';
    gulp.src(source)
        .pipe(gulp.dest(destination));
  }
  cb();
}

exports.frontEnd = moveFrontEnd;
exports.default = moveFrontEnd;
