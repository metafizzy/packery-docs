/*jhint node: true, usued: true, undef: true */

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  grunt.initConfig({
    // global settings
    namespace: 'packery',
    dataDir: 'tasks/data',

    // task settings
    jshint: {
      docs: [ 'js/**/*.js' ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    concat: {
      'docs-js': {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'build/js/packery-docs.js'
      },
      'docs-css': {
        src: [ 'css/*.css' ],
        dest: 'build/css/packery-docs.css'
      }
    },

    uglify: {
      docs: {
        files: {
          'build/js/packery-docs.min.js': [ 'build/js/packery-docs.js' ]
        }
      }
    },

    // ----- handlebars templating ----- //
    template: {
      docs: {
        files: {
          'build/': 'content/*'
        },
        options: {
          templates: 'templates/*.mustache',
          dataFiles: "data/*.json",
          defaultTemplate: 'page'
        }
      }
    },

    // ----- copy ----- //
    copy: {
      public: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'public/', // set cwd, excludes it in build path
            src: [ '**' ],
            dest: 'build/'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'css/', // set cwd, excludes it in build path
            src: [ '*' ],
            dest: 'build/css/'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'js/', // set cwd, excludes it in build path
            src: [ '**' ],
            dest: 'build/js/'
          }
        ]
      },
      pkgd: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'bower_components/packery/dist/', // set cwd, excludes it in build path
            src: [ '*.*' ],
            dest: 'build/'
          }
        ]
      },
      bowerSources: {
        // src will be set in bower-list-map
        src: [],
        dest: 'build/'
      }
    },

    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'template' ]
      },
      public: {
        files: [ 'public/**' ],
        tasks: [ 'copy:public' ]
      },
      css: {
        files: [ 'css/*' ],
        tasks: [ 'copy:css' ]
      },
      js: {
        files: [ 'js/**' ],
        tasks: [ 'copy:js' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-fizzy-docs');


  grunt.registerTask( 'default', [
    'jshint',
    'int-bower',
    'concat',
    'uglify',
    'template',
    'copy'
  ]);

};
