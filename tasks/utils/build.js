// hacking gulp-build
// https://github.com/tjeastmond/gulp-build/blob/master/index.js

var through2 = require('through2');
var hbs = require('handlebars');
var path = require('path');
var gutil = require('gulp-util');

function logError( err, filePath ) {
  filePath = filePath || '';
  gutil.log(
    gutil.colors.red('Handlebars Error'),
    gutil.colors.cyan( path.basename( filePath + ' :' ) ) ,
    err.message
  );
}

module.exports = function( data, config ) {
  data = data || {};

  if ( config && config.helpers ) {
    config.helpers.forEach( function( helper ) {
      hbs.registerHelper( helper.name, helper.fn );
    });
  }

  if ( config && config.partials ) {
    config.partials.forEach( function( partial ) {
      hbs.registerPartial( partial.name, partial.tpl );
    });
  }

  var build = function( file, encoding, callback ) {
    var fileContents = file.contents.toString();
    var template = '';

    // add file data, front matter data to data obj
    data.page = file.frontMatter;
    data.file_path = path.relative( file.cwd, file.path );
    data.basename = path.basename( file.path, path.extname( file.path ) );

    try {
      if ( config && config.layout ) {
        hbs.registerPartial( 'body', fileContents );
        template = hbs.compile( config.layout );
      } else {
        template = hbs.compile( fileContents );
      }
    } catch ( err ) {
      logError( err );
      return callback();
    }

    try {
      file.contents = new Buffer( template( data ) );
    } catch ( err ) {
      logError( err, file.path );
    }

    return callback( null, file );
  };

  return through2.obj( build );
};
