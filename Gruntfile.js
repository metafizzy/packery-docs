
var getPkgdBanner = require('./tasks/utils/get-pkgd-banner.js');

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var banner = getPkgdBanner( grunt );

  grunt.initConfig({
    // global settings
    namespace: 'packery',
    dataDir: 'tasks/data',

    // task settings
    jshint: {
      docs: [ 'js/**/*.js' ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            'packery/js/packery'
          ],
          out: 'packery.require.js',
          optimize: 'none'
        }
      }
    },

    concat: {
      js: {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'build/js/packery-docs.js'
      },
      pkgd: {
        src: [
          'bower_components/jquery-bridget/jquery.bridget.js',
          'packery.require.js',
        ],
        dest: 'build/packery.pkgd.js',
        options: {
          banner: banner
        }
      },
      css: {
        src: [ 'css/*.css' ],
        dest: 'build/css/packery-docs.css'
      }
    },

    uglify: {
      pkgd: {
        files: {
          'build/packery.pkgd.min.js': [ 'build/packery.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      },
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
          defaultTemplate: 'page',
          partialFiles: {
            'submitting-issues': 'bower_components/packery/contributing.md'
          }
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
  grunt.loadNpmTasks('grunt-requirejs');
  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'jshint',
    'requirejs',
    'int-bower',
    'concat',
    'uglify',
    'template',
    'copy'
  ]);

};
