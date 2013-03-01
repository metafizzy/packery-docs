
var path = require('path');
var spawn = require('child_process').spawn;

// -------------------------- bower list helpers -------------------------- //

function getDependencySrcs( list ) {
  var srcs = [];
  var dependency, main;
  for ( var name in list ) {
    dependency = list[ name ];
    main = dependency.source && dependency.source.main;

    if ( dependency.dependencies ) {
      var depSrcs = getDependencySrcs( dependency.dependencies );
      srcs.push.apply( srcs, depSrcs );
    }

    // add main sources to srcs
    if ( main ) {
      if ( Array.isArray( main ) ) {
        srcs.push.apply( srcs, main );
      } else {
        srcs.push( main );
      }
    }

  }
  return srcs;
}

function organizeSources( tree ) {
  // flat source filepaths
  var srcs = getDependencySrcs( tree );
  // remove duplicates, organize by file extension
  var sources = {};

  srcs.forEach( function ( src ) {
    var ext = path.extname( src );
    sources[ ext ] = sources[ ext ] || [];
    if ( sources[ ext ].indexOf( src ) === -1 ) {
      sources[ ext ].push( src );
    }
  });

  return sources;
}


// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  grunt.initConfig({
    //
    siteJS: 'js/*.js',

    concat: {
      options: {
        // stripBanners: true,
        banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      site: {
        dest: 'dist/packery-site.js'
      },
      pkgd: {
        dest: 'dist/packery.pkgd.js'
      }
    },

    uglify: {
      pkgd: {
        files: {
          'dist/packery.pkgd.min.js': [ 'dist/packery.pkgd.js' ]
        }
      },
      site: {
        files: {
          // 'dist/packery-site.min.js' will be set
        }
      }
    },

    // ----- handlebars templating ----- //
    hbarz: {
      docs: {
        files: {
          'build/': 'content/*'
        },
        options: {
          templates: 'templates/*.mustache',
          defaultTemplate: 'page'
        }
      }
    },

    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'hbarz' ]
      }
    }

  });


  // re-used vars
  var bowerMap, packerySources;

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', 'bower-map packery-sources concat uglify'.split(' ') );
  // grunt.registerTask( 'default', function() {
  // });

  grunt.registerTask( 'bower-fun', 'bower-map packery-sources'.split(' ') );


  grunt.registerTask( 'bower-map', function() {
    var done = this.async();
    var childProc = spawn('bower', 'list --map'.split(' ') );

    var mapSrc = '';

    childProc.stdout.setEncoding('utf8');
    childProc.stdout.on('data',  function( data ) {
      mapSrc += data;
    });

    childProc.on('close', function() {
      bowerMap = JSON.parse( mapSrc );
      // delete bowerMap.jquery;
      var sources = organizeSources( bowerMap );
      // remove jQuery, EventEmitter.min.js
      var jsSources = sources['.js'].filter( function( src ) {
        return src.indexOf('/jquery.js') === -1 &&
          src.indexOf('.min.js') === -1;
      });
      grunt.config.set( 'concat.site.src', jsSources );

      grunt.config.set( 'uglify.site.files', {
        'dist/packery-site.min.js': jsSources
      });

      done();
    });

  });

  grunt.registerTask( 'packery-sources', function() {
    // copy over just the packery obj
    var packeryMap = {
      packery: bowerMap.packery
    };

    packerySources = organizeSources( packeryMap );
    // console.log( packerySources );
    var srcs = packerySources['.js'];
    // filter out minified files, like EventEmitter.min.js
    srcs = srcs.filter( function( src ) {
      return src.indexOf('.min.js') === -1;
    });
    grunt.config.set( 'concat.pkgd.src', srcs );
  });

};
