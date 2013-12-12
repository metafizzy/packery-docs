
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var banner = ( function() {
    var src = grunt.file.read('bower_components/packery/js/packery.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Packery', 'Packery PACKAGED' );
  })();

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
            'jquery-bridget/jquery.bridget',
            'packery/js/packery'
          ],
          out: 'build/packery.pkgd.js',
          optimize: 'none',
          wrap: {
            start: banner
          },
          paths: {
            jquery: 'empty:'
          }
        }
      }
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
  grunt.loadNpmTasks('grunt-fizzy-docs');

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
