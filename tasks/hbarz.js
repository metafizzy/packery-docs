var path = require('path');
var handlebars = require('handlebars');

module.exports = function( grunt ) {

  grunt.registerMultiTask( 'hbarz', 'Process Handlebars templates', function() {
    // console.log( this.files );
    // var
    this.files.forEach( function( file ) {
      // console.log( file.src );
      file.src.forEach( function( filepath ) {
        var src = grunt.file.read( filepath );
        // var basename = path.basename( filepath );
        var splitPath = filepath.split( path.sep );
        // remove leading directory
        if ( splitPath.length > 1 ) {
          splitPath.splice( 0, 1 );
        }
        var dest = file.dest + '/' + splitPath.join( path.sep );
        grunt.file.write( dest, src );
      });
    });
  });

};
