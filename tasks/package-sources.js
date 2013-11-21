/**
 * package sources
 * creates foo.pkgd.js
 * built with RequireJS
 */

var requirejs = require('requirejs');

var config = {
  baseUrl: 'bower_components',
  include: [
    'packery/js/packery'
  ],
  out: 'packery.require.js',
  optimize: 'none'
};

module.exports = function( grunt ) {

  // create isotope.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    var done = this.async();
    requirejs.optimize( config, function() {
      grunt.log.writeln( 'File "' + config.out + '" created.' );
      done();
    }, function( err ) {
      grunt.log.error( err );
      done();
    });
  });

};
