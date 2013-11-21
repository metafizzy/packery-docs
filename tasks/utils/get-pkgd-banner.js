module.exports = function( grunt ) {
  var src = grunt.file.read('bower_components/packery/js/packery.js');
  var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
  var matches = src.match( re );
  return matches[0].replace( 'Packery', 'Packery PACKAGED' );
};
