
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
    }


  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask( 'default', 'concat'.split(' ') );

};
