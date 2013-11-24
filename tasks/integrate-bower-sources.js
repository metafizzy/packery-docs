/**
 * integrate JS and CSS from Bower sources
 * into concat + minify stuff
 * list all JS & CSS files for docs / concat + minify 'em
 * create packaged source file foo.pkgd.js
 */

var spawn = require('child_process').spawn;
var organizeSources = require('organize-bower-sources');

// -------------------------- helpers -------------------------- //

// pass a command, return its contents
function cli( command, callback ) {
  var args = command.split(' ');
  var arg1 = args.splice( 0, 1 );
  var process = spawn( arg1[0], args );
  var output = '';
  process.stdout.setEncoding('utf8');
  process.stdout.on( 'data',  function( data ) {
    output += data;
  });
  process.on( 'close', function() {
    callback( output );
  });
}

// -------------------------- grunt -------------------------- //

module.exports = function ( grunt ) {

  grunt.registerTask( 'int-bower', 'Integrate Bower sources', function() {

    var done = this.async();
    // get full bower map
    cli( 'bower list --json', function( mapSrc ) {
      var bowerMap = JSON.parse( mapSrc );
      var bowerSources = organizeSources( bowerMap );

      integrateJsSources( bowerSources );
      integrateCssSources( bowerSources );
      setCopySources( bowerSources );

      done();
    });

  });

  // JS files to concat and uglified for foo-docs.js and foo-docs.min.js
  function integrateJsSources( bowerSources ) {
    // remove jQuery, EventEmitter.min.js
    var bowerJsSources = bowerSources['.js'].filter( function( src ) {
      return src.indexOf('/jquery.js') === -1 &&
        src.indexOf('.min.js') === -1;
    });
    // add bower JS to JS collection
    var jsSrcs = grunt.config.get('concat.js.src');
    jsSrcs = bowerJsSources.concat( jsSrcs );
    grunt.config.set( 'concat.js.src', jsSrcs );
    // save in a data file
    var dataDir = grunt.config.get('dataDir');
    grunt.file.write( dataDir + '/js-sources.json', JSON.stringify( jsSrcs ) );
    grunt.log.writeln('integrated .js sources');
  }

  // add CSS sources to concat, if any
  function integrateCssSources( bowerSources ) {
    var bowerCssSources = bowerSources['.css'];
    if ( !bowerCssSources || !bowerCssSources.length ) {
      return;
    }
    var cssSrcs = grunt.config.get( 'concat.css.src' );
    cssSrcs = bowerCssSources.concat( cssSrcs );
    grunt.config.set( 'concat.css.src', cssSrcs );
    // save in a data file
    var dataDir = grunt.config.get('dataDir');
    grunt.file.write( dataDir + '/css-sources.json', JSON.stringify(cssSrcs) );
    grunt.log.writeln('integrated .css sources');
  }

  // copy over all sources for copying into build/
  function setCopySources( bowerSources ) {
    var copySources = grunt.config.get('copy.bowerSources.src');
    for ( var ext in bowerSources ) {
      var extSources = bowerSources[ ext ];
      copySources.push.apply( copySources, extSources );
    }
    grunt.config.set( 'copy.bowerSources.src', copySources );
    grunt.log.writeln('copy sources set');
  }

};
