
var spawn = require('child_process').spawn;

module.exports = function( grunt ) {

  //

  grunt.initConfig({


    concat: {
      options: {
        // stripBanners: true,
        // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        //   '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        src: [ 'src/project.js' ],
        dest: 'dist/built.js'
      }
    }


  });

  // var bower = require('bower');

  grunt.loadTasks('tasks');

  grunt.registerTask( 'doit', function() {

    // var done = this.async();

    // console.log( !!bower );

  });

  grunt.registerTask( 'default', function() {
    var done = this.async();
    var childProc = spawn('bower', 'list --sources'.split(' ') );

    var sourcesSrc = '';

    childProc.stdout.setEncoding('utf8');
    childProc.stdout.on('data',  function (data) {
      sourcesSrc += data;
    });

    childProc.on('close', function() {
      var sources = JSON.parse( sourcesSrc );
      console.log( sources );
      done();
    });
  });

};
