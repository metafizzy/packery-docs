var gulp = require('gulp');
var through2 = require('through2');
var path = require('path');

var partialsSrc = 'templates/partials/*.*';

module.exports = function( site ) {

  var addPartial = through2.obj( function( file, enc, callback ) {
    site.partials.push({
      name: path.basename( file.path, path.extname( file.path ) ),
      tpl: file.contents.toString()
    });
    return callback( null, file );
  });
  

  gulp.task( 'partials', function() {
    site.partials = [];

    return gulp.src( partialsSrc )
      .pipe( addPartial );
  });

};
