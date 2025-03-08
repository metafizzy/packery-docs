var gulp = require('gulp');
var concat = require('gulp-concat');
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
  // imagesloaded
  'bower_components/imagesloaded/imagesloaded.js',
  // jquery ui draggable
  'bower_components/jquery-ui-draggable/jquery-ui-draggable.js',
  // fizzy docs modules
  'bower_components/fizzy-docs-modules/*/*.js',
  // docs
  'js/boilerplate.js',
  // modules
  'modules/*/**/*.js',
  // init
  'js/init.js'
];

// concat & minify js
gulp.task( 'docs-js', function() {
  gulp.src( jsSrc )
    .pipe( concat('packery-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'copy-js', function() {
  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'js', [ 'docs-js', 'copy-js' ] );

module.exports = function( site ) {

  site.data.js_paths = getGlobPaths( jsSrc );

};
