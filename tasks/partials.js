var gulp = require('gulp');


module.exports = function( site ) {

  gulp.task( 'partials', function() {
    var addPartial = through2.obj( function( file, enc, callback ) {
      partials.push({
        name: path.basename( file.path, path.extname( file.path ) ),
        tpl: file.contents.toString()
      });
      this.push( file );
      callback();
    });

    return gulp.src( partialsSrc )
      .pipe( addPartial );
  });

};
