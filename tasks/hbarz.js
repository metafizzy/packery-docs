var path = require('path');
var handlebars = require('handlebars');
var highlightjs = require('highlight.js');

// alias XML syntax highlighting as HTML
highlightjs.LANGUAGES.html = highlightjs.LANGUAGES.xml;
highlightjs.LANGUAGES.js = highlightjs.LANGUAGES.javascript;

// parses content for ``` code blocks
// use highlight.js tfor syntax highlighting
// var reFenceBlock = /```((.|\n)+[^(```)])```/gi;
var reFirstLine = /.*\n/;
function highlight( content ) {
  // split by ```, g
  var splitContent = content.split(/\n```/);
  splitContent.forEach( function( block, i ) {
    // get every other block, which is the code
    if ( i % 2 === 0 ) {
      return;
    }

    var langMatch = block.match( reFirstLine );
    var language = langMatch && langMatch[0];
    // remove first line
    if ( language ) {
      block = block.replace( reFirstLine, '' );
      language = language.trim();
    }
    //
    var highlighted;
    if ( language ) {
      highlighted = highlightjs.highlight( language, block ).value;
    } else {
      highlighted = block;
    }
    // set content back with HTML
    splitContent[i] = '<pre><code' +
      ( language ? ' class="' + language + '"' : '' ) + '>' +
      highlighted + '</code></pre>';
  });
  return splitContent.join('\n');
}

module.exports = function( grunt ) {

  grunt.registerMultiTask( 'hbarz', 'Process Handlebars templates', function() {
    var opts = this.options();

    var templateFiles = grunt.file.expand( opts.templates );
    // hash of Handlebar templates
    var templates = {};
    templateFiles.forEach( function( filepath ) {
      var name = path.basename( filepath, path.extname( filepath ) );
      var src = grunt.file.read( filepath );
      templates[ name ] = handlebars.compile( src );
      // register all as partials
      handlebars.registerPartial( name, src );
    });

    // properties made available for templating
    var site = {};
    site.css = grunt.file.expand( grunt.config.get('concat.css.src') );
    site.js = grunt.file.expand( grunt.config.get('concat.js.src') );

    this.files.forEach( function( file ) {
      file.src.forEach( function( filepath ) {
        var src = grunt.file.read( filepath );
        src = handlebars.compile( src )();
        var splitPath = filepath.split( path.sep );
        // remove leading directory
        if ( splitPath.length > 1 ) {
          splitPath.splice( 0, 1 );
        }
        var dest = file.dest + '/' + splitPath.join( path.sep );
        // process source by template
        src = highlight( src );
        var templated = templates[ opts.defaultTemplate ]({
          content: src,
          site: site,
          basename: path.basename( filepath, path.extname( filepath ) )
        });
        grunt.file.write( dest, templated );
      });
    });
  });

};
