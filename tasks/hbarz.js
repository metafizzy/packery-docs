var path = require('path');
var handlebars = require('handlebars');

module.exports = function( grunt ) {

  grunt.registerMultiTask( 'hbarz', 'Process Handlebars templates', function() {
    // console.log( this.files );
    // var

    var opts = this.options();
    // console.log( opts );
    console.log(  );
    var templateFiles = grunt.file.expand( opts.templates );
    // hash of Handlebar templates
    var templates = {};
    templateFiles.forEach( function( filepath ) {
      var name = path.basename( filepath, path.extname( filepath ) );
      var src = grunt.file.read( filepath );
      templates[ name ] = handlebars.compile( src );
    });

    this.files.forEach( function( file ) {
      file.src.forEach( function( filepath ) {
        var src = grunt.file.read( filepath );
        // var basename = path.basename( filepath );
        var splitPath = filepath.split( path.sep );
        // remove leading directory
        if ( splitPath.length > 1 ) {
          splitPath.splice( 0, 1 );
        }
        var dest = file.dest + '/' + splitPath.join( path.sep );
        // process source by template
        var templated = templates[ opts.defaultTemplate ]({
          content: src
        });
        grunt.file.write( dest, templated );
      });
    });
  });

};
