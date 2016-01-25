var gulp = require('gulp');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var frontMatter = require('gulp-front-matter');

var getTransform = require('./utils/get-transform');
var pageNav = require('./utils/page-nav');
var highlightCodeBlock = require('./utils/highlight-code-block');
var build = require('./utils/build');

var contentSrc = [
  'content/*.html',
  'content/*.mustache'
];

// ----- page template ----- //

var pageTemplateSrc = 'templates/page.mustache';
var pageTemplate;

gulp.task( 'page-template', function() {
  return gulp.src( pageTemplateSrc )
    .pipe( getTransform( function( file, enc, next ) {
      pageTemplate = file.contents.toString();
      next( null, file );
    }));
});

module.exports = function( site ) {

  // exclude 404 if export
  var filterQuery = site.data.isExport ? [ '*', '!**/404.*'] : '*';

  site.data.sourceUrlPath = site.data.isExport ? '' :
    'https://cdnjs.cloudflare.com/ajax/libs/packery/' +
    site.data.packeryVersion + '/';

  gulp.task( 'content', [ 'partials', 'data', 'page-template' ], function() {

    var buildOptions = {
      layout: pageTemplate,
      partials: site.partials
    };

    return gulp.src( contentSrc )
      .pipe( gulpFilter( filterQuery ) )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      .pipe( build( site.data, buildOptions ) )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  });

  site.watch( contentSrc, [ 'content' ] );
  site.watch( pageTemplateSrc, [ 'content' ] );

};
