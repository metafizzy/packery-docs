
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  grunt.initConfig({
    //
    siteJS: 'js/*.js',

    concat: {
      options: {
        // stripBanners: true,
        // banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'build/js/packery-site.js'
      },
      pkgd: {
        // src will be set in package-sources task
        dest: 'build/packery.pkgd.js'
      },
      css: {
        src: [ 'components/normalize-css/normalize.css', 'css/*.css' ],
        dest: 'build/css/packery-site.css'
      }
    },

    uglify: {
      pkgd: {
        files: {
          'build/packery.pkgd.min.js': [ 'build/packery.pkgd.js' ]
        }
      },
      js: {
        files: {
          // 'build/js/packery-site.min.js' will be set in bower-list-map
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
        // additional sources will be set in bower-list-map
        // friggin Nicolas, not using main the right way :P
        src: [ 'components/normalize-css/normalize.css' ],
        dest: 'build/'
      }
    },

    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'bower-list-map', 'hbarz' ]
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'bower-list-map',
    'package-sources',
    'concat',
    'uglify',
    'hbarz',
    'copy',
  ]);

};
