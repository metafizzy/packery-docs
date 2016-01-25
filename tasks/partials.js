var gulp = require('gulp');
var path = require('path');
var partialsSrc = 'modules/*/**/*.mustache';
var getTransform = require('./utils/get-transform');


module.exports = function( site ) {

  var addPartials = getTransform( function( file, enc, next ) {
    site.partials.push({
      name: path.basename( file.path, path.extname( file.path ) ),
      tpl: file.contents.toString()
    });
    next( null, file );
  });

  gulp.task( 'partials', function() {
    site.partials = [];

    return gulp.src( partialsSrc )
      .pipe( addPartials );
  });

  site.watch( partialsSrc, [ 'content' ] );

};
