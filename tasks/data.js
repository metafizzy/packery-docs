var gulp = require('gulp');
var through2 = require('through2');
var path = require('path');

var dataSrc = 'data/*.json';

module.exports = function( site ) {

  var addJsonData = through2.obj( function( file, enc, callback ) {
    var basename = path.basename( file.path, path.extname( file.path ) );
    site[ basename ] = JSON.parse( file.contents.toString() );
    this.push( file );
    callback();
  });


  gulp.task( 'data', function() {
    return gulp.src( dataSrc )
      .pipe( addJsonData );
  });

  site.watch( dataSrc, [ 'content' ] );

};
