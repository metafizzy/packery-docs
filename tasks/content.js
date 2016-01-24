var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var frontMatter = require('gulp-front-matter');

var pageNav = require('./utils/page-nav');
var highlightCodeBlock = require('./utils/highlight-code-block');
var build = require('./utils/build');

var contentSrc = [
  'content/*.html',
  'content/*.mustache'
];

var pageTemplateSrc = 'templates/page.mustache';
var pageTemplate = fs.readFileSync( pageTemplateSrc, 'utf8' );

module.exports = function( site ) {

  gulp.task( 'content', [ 'partials', 'data' ], function() {
    // exclude 404 if export
    var filterQuery = site.data.isExport ? [ '*', '!**/404.*'] : '*';

    site.data.source_url_path = site.data.is_export ? '' :
      'https://cdnjs.cloudflare.com/ajax/libs/packery/' +
      site.data.packery_version + '/';

    var filter = gulpFilter( filterQuery );

    var buildOptions = {
      layout: pageTemplate,
      partials: site.partials
    };

    return gulp.src( contentSrc )
      .pipe( filter )
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
