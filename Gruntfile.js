
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

  // from `bower list --sources`
  var bowerJSSources = [
    "components/classie/classie.js",
    "components/eventEmitter/EventEmitter.js",
    "components/eventie/eventie.js",
    "components/doc-listener/doc-listener.js",
    "components/get-style-property/get-style-property.js",
    "components/get-size/get-size.js",
    "components/draggabilly/draggabilly.js",
    "components/jquery/jquery.js",
    "components/matches-selector/matches-selector.js",
    "components/packery/js/rect.js",
    "components/packery/js/packer.js",
    "components/packery/js/item.js",
    "components/packery/js/packery.js"
  ];

  grunt.initConfig({
    // from `bower list --sources`
    bowerJSSources: bowerJSSources,
    //
    siteJS: 'js/*.js',

    concat: {
      options: {
        // stripBanners: true,
        banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: bowerJSSources,
        dest: 'dist/packery.dist.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/packery.dist.min.js': [ 'dist/packery.dist.js' ]
        }
      }
    }
  });


  // re-used vars
  var bowerMap, packerySources;

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'default', 'concat uglify'.split(' ') );

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
      // grunt.config.set( 'bower-map', map );
      // var sources = organizeSources( bowerMap.packery );
      console.log( bowerMap );
      done();
    });

  });

  grunt.registerTask( 'packery-sources', function() {
    // copy over just the packery obj
    var packeryMap = {
      packery: bowerMap.packery
    }

    packerySources = organizeSources( packeryMap );
    console.log( packerySources );
  });


};
