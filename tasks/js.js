var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  // packery dependencies
  'bower_components/get-style-property/get-style-property.js',
  'bower_components/get-size/get-size.js',
  'bower_components/matches-selector/matches-selector.js',
  'bower_components/eventEmitter/EventEmitter.js',
  'bower_components/eventie/eventie.js',
  'bower_components/doc-ready/doc-ready.js',
  'bower_components/classie/classie.js',
  'bower_components/fizzy-ui-utils/utils.js',
  'bower_components/jquery-bridget/jquery.bridget.js',
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
  'js/pages/*.js'
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
