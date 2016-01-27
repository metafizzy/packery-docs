var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  // packery dependencies
  'bower_components/get-size/get-size.js',
  'bower_components/desandro-matches-selector/matches-selector.js',
  'bower_components/ev-emitter/ev-emitter.js',
  'bower_components/fizzy-ui-utils/utils.js',
  'bower_components/jquery-bridget/jquery-bridget.js',
  'bower_components/outlayer/item.js',
  'bower_components/outlayer/outlayer.js',
  // packery
  'bower_components/packery/js/rect.js',
  'bower_components/packery/js/packer.js',
  'bower_components/packery/js/item.js',
  'bower_components/packery/js/packery.js',
  // draggabilly
  'bower_components/unipointer/unipointer.js',
  'bower_components/unidragger/unidragger.js',
  'bower_components/draggabilly/draggabilly.js',
  // jquery ui draggable
  'bower_components/jquery-ui-draggable/jquery-ui-draggable.js',
  // docs
  'js/controller.js',
  'js/pages/*.js',
  // namespace
  'js/namespace.js',
  // modules
  'modules/*/**/*.js',
  // init
  'js/init.js'
];

// concat & minify js
gulp.task( 'js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('packery-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

module.exports = function( site ) {

  site.data.js_paths = getGlobPaths( jsSrc );

};
