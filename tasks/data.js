var gulp = require('gulp');
var getTransform = require('./utils/get-transform');
var path = require('path');

var dataSrc = 'data/*.json';

module.exports = function( site ) {

  var addJsonData = getTransform( function( file, enc, next ) {
    var basename = path.basename( file.path, path.extname( file.path ) );
    site.data[ basename ] = JSON.parse( file.contents.toString() );
    next( null, file );
  });

  gulp.task( 'json-data', function() {
    return gulp.src( dataSrc )
      .pipe( addJsonData );
  });

  gulp.task( 'packery-version', function() {
    return gulp.src('bower_components/packery/.bower.json')
      .pipe( getTransform( function( file, enc, next ) {
        var json = JSON.parse( file.contents.toString() );
        site.data.packeryVersion = json.version;
        site.data.packeryMinorVersion = json.version.match(/^\d\.\d+/)[0];
        next( null, file );
      }));
  });

  gulp.task( 'data', [ 'json-data', 'packery-version' ] );

  site.watch( dataSrc, [ 'content' ] );

};
