/**
 * integrate JS and CSS from Bower sources
 * into concat + minify stuff
 * list all JS & CSS files for docs / concat + minify 'em
 * create packaged source file foo.pkgd.js
 */

var spawn = require('child_process').spawn;
var organizeSources = require('organize-bower-sources');

module.exports = function integrateBowerSources( namespace, grunt, callback ) {
  // get full bower map
  cli( 'bower list --json', function( mapSrc ) {
    var bowerMap = JSON.parse( mapSrc );

    var bowerSources = organizeSources( bowerMap );
    
    integrateJsSources( namespace, grunt, bowerSources );

    integrateCssSources( grunt, bowerSources );

    setCopySources( grunt, bowerSources );

    if ( typeof callback === 'function' ) {
      callback();
    }
  });

};

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

function integrateJsSources( namespace, grunt, bowerSources ) {
  // remove jQuery, EventEmitter.min.js
  var bowerJsSources = bowerSources['.js'].filter( function( src ) {
    return src.indexOf('/jquery.js') === -1 &&
      src.indexOf('.min.js') === -1;
  });
  // add bower JS to JS collection
  var jsSrcs = grunt.config.get('concat.js.src');
  jsSrcs = bowerJsSources.concat( jsSrcs );
  grunt.config.set( 'concat.js.src', jsSrcs );
  var uglifyJSOpt = {};
  uglifyJSOpt[ 'build/js/' + namespace + '-docs.min.js' ] = jsSrcs;
  grunt.config.set( 'uglify.js.files', uglifyJSOpt );
  grunt.log.writeln('integrated .js sources');
}

// add CSS sources to concat, if any
function integrateCssSources( grunt, bowerSources ) {
  var bowerCssSources = bowerSources['.css'];
  if ( !bowerCssSources || !bowerCssSources.length ) {
    return;
  }
  var cssSrcs = grunt.config.get( 'concat.css.src' );
  cssSrcs = bowerCssSources.concat( cssSrcs );
  grunt.config.set( 'concat.css.src', cssSrcs );
  grunt.log.writeln('integrated .css sources');
}

// copy over all sources for copying into build/
function setCopySources( grunt, bowerSources ) {
  var copySources = grunt.config.get('copy.bowerSources.src');
  for ( var ext in bowerSources ) {
    var extSources = bowerSources[ ext ];
    copySources.push.apply( copySources, extSources );
  }
  grunt.config.set( 'copy.bowerSources.src', copySources );
  grunt.log.writeln('copy sources set');
}
